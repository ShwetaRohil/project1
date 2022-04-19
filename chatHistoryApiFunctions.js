"use strict";
/*
Coder:SR
File:chatHistoryApiFunctions.js
Date:18-10-2021
Purpose: Contains functions related to chat history
*/
let saveChatHistory = function(db, cname, user_id, chat_text, room_id, res) {
    try {
        let obj = {};
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        obj.dt = dateTime;
        obj.ui = user_id;
        obj.ct = chat_text;
        obj.ri = room_id;

        db.collection(cname).insertOne(obj, (err) => {
            if (err) {
                res.send("Error occured in saving chat history")
            } else {
                res.send("Chat history saved")
            }
        })
    } catch (e) {
        console.log("Error occured in saveChatHistory Function: " + e)
    }
}

let getChatHistory = function(db, cname, roomid, res) {
    const CHAT_HISTORY_COUNT = 3;
    try {
        let room_id = parseInt(roomid);
        db.collection(cname).find({ ri: room_id }).limit(CHAT_HISTORY_COUNT).toArray(function(err, result) {
            if (err) {
                res.send("Error Occured in getting chat history");
            } else {
                res.send(result);
            }
        })
    } catch (e) {
        console.log("Error occured in getHistory: " + e)
    }
}

module.exports = { saveChatHistory, getChatHistory }