"use strict";
/*
Coder:SR
File:sitesApiFunctions.js
Date:18-10-2021
Purpose: Contains functions related to sites
*/

let addSite = function(db, cname, res, obj_add, stringify) {
    try {
        let objadd = obj_add;
        objadd.co = Date.now(); //created on
        objadd.uo = Date.now(); //updated on
        db.collection(cname).insertOne(objadd, (err) => {
            let inserted_id = objadd._id;
            if (err) {
                let obj = {};
                obj.msg = "Site Already Exists";
                obj.error = 409;
                res
                    .code(409)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            } else {
                let obj = {};
                obj.msg = "Site Added";
                obj.error = 0;
                obj._id = inserted_id
                res
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            }
        })
    } catch (e) {
        console.log(e)
    }

}

let updateSite = function(db, cname, res, id, site_name, domain, stringify) {
    try {
        let sitename = site_name;
        let myquery = {
            _id: id
        }
        let newvalues = {
            $set: {
                sn: sitename,
                d:domain,
                uo: Date.now()
            }
        }
        db.collection(cname).updateOne(myquery, newvalues, (err, result) => {
            if (result.matchedCount === 0) {
                let obj = {};
                obj.msg = "Site doesn't Exists";
                obj.error = 404;
                res
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(stringify(obj))
            } else {
                let obj = {};
                obj.msg = "Site Updated";
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

let deleteSite = function(db, cname, id, res, stringify) {
    db.collection(cname).deleteOne({
        _id: id
    }, (err, result) => {
        if (result.deletedCount === 0) {
            let obj = {};
            obj.msg = "Site doesn't Exists";
            obj.error = 404;
            res
                .code(404)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(stringify(obj))
        } else {
            let obj = {};
            obj.msg = "Site Deleted and Deleted Count: " + result.deletedCount;
            obj.error = 0;
            res
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(stringify(obj))
        }
    })
}

let get_all_sites = function(db, cname, res) {
    db.collection(cname).find({}).toArray((err, result) => {
        for (let i=0;i<result.length;i++){
            result[i].sn=result[i].sn.toLowerCase();
            // result[i].co=result[i].co.toDateString();
            result[i].co=new Date(result[i].co);
            result[i].uo=new Date(result[i].uo);
        }
        res.send(result);
    })
}

let get_sites=function(db,cname,res){
    db.collection(cname).find({}).toArray((err, result) => {
        console.log(err)
        res.send(result);
    })
}

module.exports = {
    addSite,
    updateSite,
    deleteSite,
    get_all_sites,
    get_sites
}