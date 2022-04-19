"use strict";
/*
Coder:SR
File:chatRoomsApiFunctions.js
Date:18-10-2021
Purpose: Contains functions related to chat rooms
*/



let create_chat_room = function (db, cname, res, obj_add, stringify) {
    try {
        let obj = obj_add;
        db.collection(cname).insertOne(obj, (err) => {
            let inserted_id = obj._id;
            if (err) {
                let obj = {};
                obj.msg = "Room Already Exists";
                obj.error = 409;
                res
                    .code(409)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            } else {
                let obj = {};
                obj.msg = "Room Added";
                obj.error = 0;
                obj._id = inserted_id
                res
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            }
        })
    } catch (e) {
        console.log(e);
    }
}

let update_chat_room = function (db, cname, obj, res, stringify) {
    try {
        let obj_update = obj;
        let id_to_update = obj_update._id;
        let myquery = {
            _id: id_to_update
        }
        let newvalues = {
            $set: {
                si: obj_update.si,
                rn: obj_update.rn,
                rd: obj_update.rd,
                co: obj_update.co,
                ci: obj_update.ci,
                e: obj_update.e,
                lu: obj_update.lu,
                ubi: obj_update.ubi,
                d: obj_update.d,
                // lu: Date.now(),

            }
        }

        db.collection(cname).updateOne(myquery, newvalues, (err, result) => {
            if (result.matchedCount === 0) {
                let obj = {};
                obj.msg = "Room doesn't exist",
                    obj.error = 404
                res
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            } else {
                let obj = {};
                obj.msg = "Room Updated";
                obj.error = 0;
                res
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            }
        })
    } catch (e) {
        console.log("Error occured in update_chat_room function : " + e)
    }
}

let list_chat_rooms = function (db, cname, siteid, res) {
    try {
        let s = siteid
        db.collection(cname).find({
            si: s
        }).toArray((err, result) => {
            res.send(result);
        })

    } catch (e) {
        console.log(e)
    }
}

let delete_chat_room = function (db, cname, id, res, stringify) {
    db.collection(cname).deleteOne({
        _id: id
    }, (err, result) => {
        if (result.deletedCount === 0) {
            let obj = {};
            obj.msg = "Room doesnt exist";
            obj.error = 404;
            res
                .code(404)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(stringify(obj));
        } else {
            let obj = {};
            obj.msg = "Room Deleted and Deleted Count: " + result.deletedCount;
            obj.error = 0;
            res
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(stringify(obj))
        }
    })
}

let get_all_rooms = function (db, cname, res) {
    db.collection(cname).find({}).toArray((err, result) => {

        for (let i = 0; i < result.length; i++) {
            result[i].rn = result[i].rn.toLowerCase();
            result[i].co = new Date(result[i].co);
            result[i].lu = new Date(result[i].lu);
            if (result[i].d === 1) {
                result[i].d = "Yes";
            }
            else {
                result[i].d = "No";
            }

        }
        res.send(result);
    })
}

let update_default = function (db, cname, id, def, res,stringify) {
    try {
        let id_to_update = id;
        let myquery = {
            _id: id_to_update
        }
        let newvalues = {
            $set: {
                d: def
            }
        }

        db.collection(cname).updateOne(myquery, newvalues, (err, result) => {
            if (result.matchedCount === 0) {
                let obj = {};
                obj.msg = "Room doesn't exist",
                    obj.error = 404
                res
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            } else {
                let obj = {};
                obj.msg = "Room Updated";
                obj.error = 0;
                res
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            }
        })

    } catch (e) {

    }
}

module.exports = {
    create_chat_room,
    update_chat_room,
    list_chat_rooms,
    delete_chat_room,
    get_all_rooms,
    update_default
}