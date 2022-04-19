"use strict";
/*
Coder:SR
File:userApiFunctions.js
Date:18-10-2021
Purpose: Contains functions related to users
*/


var faker = require('faker');

let regionNames = new Intl.DisplayNames(['en'], {
    type: 'region'
});


let project = {
    a: 1,
    c: 1,
    s: 1,
    cc: 1,
    m: 1,
    g: 1,
    fn: 1,
    u: 1,
    ct: 1
}

let getAllUsers = function (db, cName, res) {
    db.collection(cName).find({}, {
        // projection: project
    }).toArray((err, result) => {
        res.send(result);
    })
}

let addUser = function (db, cName, obj_user, res, stringify) {
    try {
        // console.log("add user called")
        // let date_ob = new Date();

        // // adjust 0 before single digit date
        // let date = ("0" + date_ob.getDate()).slice(-2);
        // // current month
        // let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // // current year
        // let year = date_ob.getFullYear();
        // // current hours
        // let hours = date_ob.getHours();
        // // current minutes
        // let minutes = date_ob.getMinutes();
        // // current seconds
        // let seconds = date_ob.getSeconds();

        // let obj_user = {};
        // obj_user.fn = firstname;
        // obj_user.ln = lastname;
        // obj_user.u = userName;
        // // obj_user.ri = roomId;
        // obj_user.si = siteId;
        // // console.log(obj_user.u);
        // // obj_user.fn = (userName.substring(0, 4)) + date + month + year + hours + minutes + seconds;
        // let ip = faker.internet.ip();
        // // console.log(ip)
        // obj_user.ip = ip;
        // // let geo = geoip.lookup(ip);
        // // obj.ln = geo.range[0];
        // // obj.lt = geo.range[1];
        // obj_user.cc = faker.address.countryCode(); //country
        // obj_user.c = regionNames.of(obj_user.cc);
        // // console.log("ahdjahdjadh");
        // obj_user.ct = faker.address.city(); //city
        // obj_user.s = faker.address.state(); //states
        // obj_user.em = faker.internet.email(); //email id
        // obj_user.ph = faker.phone.phoneNumber(); //phone number
        // obj_user.m = 1000; //money
        // obj_user.mt = "G"; //membership_type
        // obj_user.el = "L"; //engagement_level
        // obj_user.rf = 2545; //referals
        // obj_user.pi = 12345; //parent_id
        // obj_user.ir = 9999999; //indirect referrals
        // obj_user.z = faker.address.zipCode(); //zipcode
        // obj_user.d = "S"; //designation
        // obj_user.e = 88; //employer
        // obj_user.h = "156"; //height
        // obj_user.fl = "N"; //fitness_level
        // obj_user.ed = "H"; //education
        // obj_user.sm = 1; //smoke
        // obj_user.dr = 1; //drink
        // obj_user.cr = 3; //children
        // obj_user.ss = "VI"; //sunsign
        // obj_user.p = 0; //political
        // obj_user.l = "HI"; //languages
        // obj_user.t = "Leaders are made, not born"; //tagline
        // obj_user.r = "H"; //religion
        // obj_user.dob = "12-09-1996"; //dob
        // obj_user.ldt = Date.now(); //last login date time
        // obj_user.cdt = Date.now(); //current date time
        // obj_user.loc = {
        //     type: "Point",
        //     coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())]
        // };
        // obj_user.a = faker.datatype.number(100); //age
        // obj_user.g = faker.datatype.number(0, 2); //gender

        // console.log(obj_user);

        db.collection(cName).insertOne(obj_user, (err) => {
            let inserted_id = obj_user._id;
            let username = obj_user.u;
            if (err) {
                let obj = {};
                obj.msg = "User Already Exists";
                obj.error = 409;
                res
                    .code(409)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            } else {
                let obj = {};
                obj.msg = "User Added";
                obj.error = 0;
                obj._id = inserted_id
                res
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))

                // let img_name = inserted_id + ".jpg"

                // let myquery = {
                //     u: username
                // };
                // let new_values = {
                //     $set: {
                //         dp: img_name
                //     }
                // }
                // db.collection(cName).updateOne(myquery, new_values);
            }
        })
    } catch (e) {

    }
}

let updateUser = function (db, cName, obj, res, stringify) {
    try {
        let query = {
            _id: obj._id
        }
        let newvalues = {
            $set: {
            fn:obj.fn,
            ln:obj.ln,
            fi:obj.fi,
            u:obj.u,
            ri:obj.ri,
            si:obj.si,
            ip:obj.ip,
            cc:obj.cc,
            c:obj.c,
            ct:obj.ct,
            s:obj.s,
            em:obj.em,
            ph:obj.ph,
            m:obj.m,
            mt:obj.mt,
            el:obj.el,
            rf:obj.rf,
            pi:obj.pi,
            ir:obj.ir,
            z:obj.z,
            d:obj.d,
            e:obj.e,
            h:obj.h,
            fl:obj.fl,
            ed:obj.ed,
            sm:obj.sm,
            dr:obj.dr,
            cr:obj.cr,
            ss:obj.ss,
            p:obj.p,
            l:obj.l,
            t:obj.t,
            r:obj.r,
            dob:obj.dob,
            ldt:obj.ldt,
            cdt:obj.cdt,
            // loc[type]:obj.loc.type,
            // loc.cordinates[0]:obj.loc.coordinates[0],
            // loc.coordinates[1]:obj.loc.coordinates[1],
            a:obj.a,
            g:obj.g,
            dp:obj.dp
            }
        };
        db.collection(cName).updateOne(query, newvalues, (err, result) => {
            if (err) {
                console.log("error");
            }
            if (result.matchedCount === 0) {
                let obj = {}
                obj.msg = "User doesn't exist"
                obj.error = 404;
                res
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            } else {
                let obj = {};
                obj.msg = "User Updated";
                obj.error = 0
                res
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            }
        })
    } catch (e) {
        console.log("Error occured in updateUser function" + e);
    }
}

let showData = async function (db, cName, arr_id, res, ObjectId) {
    try {
        let final_result = [];
        for (let i = 0; i < arr_id.length; i++) {
            await db.collection(cName).findOne({
                _id: ObjectId(arr_id[i])
            }, {
                projection: project
            }, function (err, result) {
                final_result.push(result);
                // console.log(result);
            })
        }


        setTimeout(() => res.send(final_result), 3000);

    } catch (e) {
        console.log("Error Occured in showData Function")
    }
}

let searchUser = function (db, cName, lat, lon, gen, res) {
    try {
        db.collection(cName).aggregate([{
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [lat, lon]
                },
                distanceField: "ad",
                maxDistance: 200500,
                query: {
                    "g": gen
                },
                includeLocs: "users.loc",
                spherical: true
            },

        }, {
            $project: {
                "_id": 1,
                "a": 1,
                "cc": 1,
                "m": 1,
                "g": 1,
                "d": 1,
                "e": 1,
                "h": 1,
                "u": 1,
                "fl": 1,
                "ed": 1,
                "sm": 1,
                "dr": 1,
                "cr": 1,
                "ss": 1,
                "p": 1,
                "l": 1,
                "t": 1,
                "ad": 1,
                "dp": 1
            }
        }]).limit(100).toArray(function (err, result) {
            if (err) {
                res.send("Error Occured in Getting Users");
            } else {
                res.send(result);
            }
        })
    } catch (e) {
        console.log("Error occured in searchUser function")
    }
}

let searchUsersInRoom = function (db, cName, room_id, res) {
    try {
        db.collection(cName).find({
            ri: room_id
        }, {
            projection: project
        }).toArray((err, result) => {
            res.send(result);
        })

    } catch (e) {
        console.log(e)
    }
}

let searchUsersInSite = function (db, cName, site_id, res) {
    try {
        db.collection(cName).find({
            si: site_id
        }, {
            projection: project
        }).toArray((err, result) => {
            res.send(result);
        })

    } catch (e) {
        console.log(e)
    }
}

let deleteUser = function (db, cName, id, res, stringify) {
    db.collection(cName).deleteOne({
        _id: id
    }, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.deletedCount === 0) {
            let obj = {};
            obj.msg = "User doesn't exist"
            obj.error = 404
            res
                .code(404)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(stringify(obj))
        } else {
            let obj = {};
            obj.msg = "User deleted and Deleted Count: " + result.deletedCount;
            obj.error = 0
            res
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(stringify(obj))
        }
    })
}

let getUsers = function (db, cname, res) {
    db.collection(cname).find({}).toArray((err, result) => {
        res.send(result);
    })
}

module.exports = {
    showData,
    searchUser,
    addUser,
    searchUsersInRoom,
    getAllUsers,
    searchUsersInSite,
    updateUser,
    deleteUser,
    getUsers

}