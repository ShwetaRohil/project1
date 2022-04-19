const faker = require('faker');

var geoip = require('geoip-country');

let ip = "103.102.30.43";
let id;

let processFBID = function(db, collection_name, fbid, username, reply) {

    try {

        db.collection(collection_name).findOne({
            'fi': fbid
        }, function(err, user) {
            if (user) {
                id = user._id;
                console.log("fi exist");
                // reply.redirect('https://chat.hejo.io/chat/index.html?_id=' + id);
                reply.redirect('/chat/index.html?_id=' + id);
                return id;
            } else {
                console.log("does not exist")
                    // let myquery={u:username};
                    // let new_value={$set:{fi:fbid}}
                    // db.collection(collection_name).updateOne(myquery,new_value,function(err,res){
                    //     console.log("updated fi");
                    // })

                let date_ob = new Date();

                // adjust 0 before single digit date
                let date = ("0" + date_ob.getDate()).slice(-2);

                // current month
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                // current year
                let year = date_ob.getFullYear();

                // current hours
                let hours = date_ob.getHours();

                // current minutes
                let minutes = date_ob.getMinutes();

                // current seconds
                let seconds = date_ob.getSeconds();

                let obj = {};
                obj.u = username; //name
                obj.fi = fbid; //fbid
                obj.fn = username.split("_")[0].substring(0, 4) + date + month + year + hours + minutes + seconds;
                obj.ip = ip; //harcoded for now
                let geo = geoip.lookup(ip);
                // obj.ln = geo.range[0];
                // obj.lt = geo.range[1];
                obj.cc = geo.country; //country
                obj.ct = geo.city; //city
                obj.s = geo.region; //states
                obj.em = faker.internet.email(); //email id
                obj.ph = faker.phone.phoneNumber(); //phone number
                obj.m = 1000; //money
                obj.mt = "G"; //membership_type
                obj.el = "L"; //engagement_level
                obj.rf = 2545; //referals
                obj.pi = 12345; //parent_id
                obj.ir = 9999999; //indirect referrals
                obj.z = faker.address.zipCode(); //zipcode
                obj.d = "S"; //designation
                obj.e = 88; //employer
                obj.h = "156"; //height
                obj.fl = "N"; //fitness_level
                obj.ed = "H"; //education
                obj.sm = 1; //smoke
                obj.dr = 1; //drink
                obj.cr = 3; //children
                obj.ss = "VI"; //sunsign
                obj.p = 0; //political
                obj.l = "HI"; //languages
                obj.t = "Leaders are made, not born"; //tagline
                obj.r = "H"; //religion
                obj.dob = "12-09-1996"; //dob
                obj.ldt = "1632140978"; //last login date time
                obj.cdt = "1632140978"; //current date time
                obj.loc = {
                    type: "Point",
                    coordinates: [parseFloat(faker.address.longitude()), parseFloat(faker.address.latitude())]
                };
                obj.a = faker.datatype.number(100); //age
                obj.g = faker.datatype.number(0, 2); //gender


                // console.log(obj);

                db.collection(collection_name).insertOne(obj, function(err, res) {
                    if (err) {
                        console.log(err)
                    }
                    id = obj._id;
                    console.log("fi inserted");
                    // reply.redirect('https://chat.hejo.io/chat/index.html?_id=' + id)
                    reply.redirect('/chat/index.html?_id=' + id)

                })
            }
        })


    } catch (e) {
        console.log(e);
    }

}

module.exports = {
    processFBID
}