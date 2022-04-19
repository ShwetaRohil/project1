"use strict";
/*
Coder:SR
File:blockApiFunctions.js
Date:18-10-2021
Purpose: Contains functions related to blocking
*/

let add_block = function(db, cName, obj, res) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    obj.dt = dateTime;

    db.collection(cName).insertOne(obj, (err, result) => {
        let inserted_id = obj._id;
        if (err) {
            res
                .code(409)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({
                    msg: "Already Blocked",
                    error: 404
                })
        } else {
            res
                .code(404)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({
                    msg: "User Blocked",
                    error: 404
                })
        }
    })

}

let remove_block = function(db, cName, blocker_id, blocked_id, res) {

    db.collection(cName).deleteOne({
        br: blocker_id,
        bd: blocked_id
    }, (err, result) => {
        if (result.deletedCount === 0) {
            res
                .code(404)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({
                    msg: "User isn't Blocked",
                    error: 404
                })
        } else {
            res
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send({
                    msg: "User Unblocked and Unblocked Count: " + result.deletedCount,
                    error: 0,
                })
        }

    })
}

let list_blocks_by_blocker_id = function(db, cName, blocker_id, res) {
    db.collection(cName).find({
        br: blocker_id
    }, {
        projection: {
            _id: 0,
            bd: 1,
            dt: 1
        }
    }).limit(100).toArray(function(err, result) {
        if (err) {
            res.send("Error Occured in getting blocks")
        } else {
            res.send(result);
        }
    })
}
let list_blocks_by_blocked_id = function(db, cName, blocked_id, res) {
    db.collection(cName).find({
        bd: blocked_id
    }, {
        projection: {
            _id: 0,
            br: 1,
            dt: 1
        }
    }).limit(100).toArray(function(err, result) {
        if (err) {
            res.send("Error Occured in getting blocks")
        } else {
            res.send(result);
        }
    })

}
module.exports = {
    add_block,
    remove_block,
    list_blocks_by_blocked_id,
    list_blocks_by_blocker_id
}