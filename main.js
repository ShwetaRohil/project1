"use strict";
/*
Coder:SR
File:main.js
Date:18-10-2021
Purpose: Provides endpoints 
*/
const path = require('path');
const users = require("./userAPiFunctions");
const chatHistory = require("./chatHistoryApiFunctions");
const chatRooms = require("./chatRoomsApiFunctions");
const sites = require("./sitesApiFunctions");
const block = require("./blockApiFunctions");
const pagination = require("./dummypagination");
const network = require("./networkApiFunctions");
const fb = require("./fbid_update");

const sget = require('simple-get');
const oauthPlugin = require('fastify-oauth2');
const API_HOST = "https://api.hejo.io";

const fastJson = require('fast-json-stringify')

const stringify = fastJson({
    title: 'Response',
    type: 'object',
    properties: {
        msg: {
            type: 'string'
        },
        error: {
            type: 'integer'
        },
        _id: {
            type: 'string'
        }
    }
})

const {
    MongoClient,
    ObjectId
} = require("mongodb");

const uri = "mongodb+srv://shweta:shweta1234@brizy.3dxsj.mongodb.net/test?authSource=admin&replicaSet=atlas-qkjtw3-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = client.db("hejo");

const fastify = require('fastify')({
    logger: false
});

fastify.register(require('fastify-cors'), {
    // put your options here
    origin: "*"
});

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public')
});

fastify.register(oauthPlugin, {
    name: 'facebookOAuth2',
    credentials: {
        client: {
            id: '1875220195983807',
            secret: '853a5b149d4eae04b46898c2ab96ceb0'
        },
        auth: oauthPlugin.FACEBOOK_CONFIGURATION
    },
    // register a fastify url to start the redirect flow
    startRedirectPath: '/login/facebook',
    // facebook redirect here after the user login
    callbackUri: 'https://chat.hejo.io/login/facebookdone'

    //whatever redirect here after
})

client.connect(() => {

    fastify.listen(80, () => {
        try {
            console.log("Listening at port 80");
        } catch (e) {
            console.log("Error occured in server listening: " + e);
        }
    });



    /* users apis*/

    fastify.get('/api/users/all', (req, res) => {
        try {
            users.getAllUsers(db, "users", res)
        } catch (e) {
            console.log("Error occured in /api/users/all")
        }
    })

    fastify.post('/api/site/users', (req, res) => {
        try {
            let siteId = req.query.site_id;
            siteId = ObjectId(siteId);
            users.searchUsersInSite(db, "users", siteId, res);
        } catch (e) {
            console.log("Error occured in /api/site/users")
        }
    })

    fastify.get('/api/user/add', (req, res) => {
        try {
            let obj={};
            obj._id = ObjectId(req.query._id);
            obj.fn=req.query.fn;
            obj.ln=req.query.ln;
            obj.fi=req.query.fi;
            obj.u=req.query.u;
            obj.ri=ObjectId(req.query.ri);
            obj.si=ObjectId(req.query.si);
            obj.ip=req.query.ip;
            obj.cc=req.query.cc;
            obj.c=req.query.c;
            obj.ct=req.query.ct;
            obj.s=req.query.s;
            obj.em=req.query.em;
            obj.ph=parseInt(req.query.ph);
            obj.m=parseInt(req.query.m);
            obj.mt=req.query.mt;
            obj.el=req.query.el;
            obj.rf=parseInt(req.query.rf);
            obj.pi=req.query.pi;
            obj.ir=parseInt(req.query.ir);
            obj.z=parseInt(req.query.z);
            obj.d=req.query.d;
            obj.e=parseInt(req.query.e);
            obj.h=parseInt(req.query.h);
            obj.fl=req.query.fl;
            obj.ed=req.query.ed;
            obj.sm=parseInt(req.query.sm);
            obj.dr=parseInt(req.query.dr);
            obj.cr=parseInt(req.query.cr);
            obj.ss=req.query.ss;
            obj.p=parseInt(req.query.p);
            obj.l=req.query.l;
            obj.t=req.query.t;
            obj.r=req.query.r;
            obj.dob=req.query.dob;
            obj.ldt=parseInt(req.query.ldt);
            obj.cdt=parseInt(req.query.cdt);
            // obj.loc.type=req.query.loc.type;
            // obj.loc.coordinates[0]=req.query.loc.coordinates[0];
            // obj.loc.coordinates[1]=req.query.loc.coordinates[1];
            obj.a=parseInt(req.query.a);
            obj.g=parseInt(req.query.g);
            obj.dp=req.query.dp;

            users.addUser(db, "users", obj, res, stringify);
        } catch (e) {
            console.log("Error occured in /api/user/add: " + e)
        }
    })

    fastify.get('/api/user/update', (req, res) => {
        try {
            let obj={};
            obj._id = ObjectId(req.query._id);
            obj.fn=req.query.fn;
            obj.ln=req.query.ln;
            obj.fi=req.query.fi;
            obj.u=req.query.u;
            obj.ri=ObjectId(req.query.ri);
            obj.si=ObjectId(req.query.si);
            obj.ip=req.query.ip;
            obj.cc=req.query.cc;
            obj.c=req.query.c;
            obj.ct=req.query.ct;
            obj.s=req.query.s;
            obj.em=req.query.em;
            obj.ph=req.query.ph;
            obj.m=req.query.m;
            obj.mt=req.query.mt;
            obj.el=req.query.el;
            obj.rf=req.query.rf;
            obj.pi=req.query.pi;
            obj.ir=req.query.ir;
            obj.z=req.query.z;
            obj.d=req.query.d;
            obj.e=req.query.e;
            obj.h=req.query.h;
            obj.fl=req.query.fl;
            obj.ed=req.query.ed;
            obj.sm=req.query.sm;
            obj.dr=req.query.dr;
            obj.cr=req.query.cr;
            obj.ss=req.query.ss;
            obj.p=req.query.p;
            obj.l=req.query.l;
            obj.t=req.query.t;
            obj.r=req.query.r;
            obj.dob=req.query.dob;
            obj.ldt=req.query.ldt;
            obj.cdt=req.query.cdt;
            // obj.loc.type=req.query.loc.type;
            // obj.loc.coordinates[0]=req.query.loc.coordinates[0];
            // obj.loc.coordinates[1]=req.query.loc.coordinates[1];
            obj.a=req.query.a;
            obj.g=req.query.g;
            obj.dp=req.query.dp;

            users.updateUser(db, "users", obj, res, stringify);
        } catch (e) {
            console.log("Error occured in /api/user/update" + e)
        }
    })

    fastify.get('/api/user/delete', (req, res) => {
        try {
            let id = req.query._id;
            id = ObjectId(id);
            users.deleteUser(db, "users", id, res, stringify);
        } catch (e) {
            console.log("Error occured in /api/user/delete")
        }
    })

    fastify.post('/api/user/info', async(req, res) => {
        try {
            let id = req.query._id;
            let array_id = id.split(",");
            users.showData(db, "users", array_id, res, ObjectId)
        } catch (e) {
            console.log("Error occured in /api/user/info: " + e)
        }
    });

    fastify.get('/ui/showprofile', (req, res) => {
        try {
            return res.sendFile('showprofile.html')
        } catch (e) {
            console.log("Error occured in /ui/showprofile: " + e)
        }
    });

    fastify.post('/api/user/search', async(req, res) => {
        try {
            let gen = req.query.gender;
            gen = parseInt(gen);
            let ageFrom = req.query.age_from;
            ageFrom = parseInt(ageFrom);
            let ageTo = req.query.age_to;
            ageTo = parseInt(ageTo);
            let con_code = req.query.con_code;
            let lat = req.query.latitude;
            lat = parseFloat(lat);
            let lon = req.query.longitude;
            lon = parseFloat(lon);

            users.searchUser(db, "users", lat, lon, gen, res)
        } catch (e) {
            console.log("Error occured in /api/user/search: " + e)
        }
    })

    fastify.post('/api/room/users', (req, res) => {
        try {
            let roomId = req.query.room_id;
            roomId = ObjectId(roomId);
            users.searchUsersInRoom(db, "users", roomId, res);
        } catch (e) {
            console.log("Error occured in /api/room/users")
        }
    })

    fastify.get('/ui/showsearch', (req, res) => {
        try {
            return res.sendFile('showsearch.html')
        } catch (e) {
            console.log("Error occured in /ui/showsearch: " + e)
        }

    })

    fastify.get('/profile.html.handlebars', (req, res) => {
        try {
            return res.sendFile('profile.html.handlebars')
        } catch (e) {
            console.log("Error occured in /profile.html.handlebars: " + e)
        }
    })

    fastify.get('/loadTemplate.js', (req, res) => {
        try {
            return res.sendFile('loadTemplate.js')
        } catch (e) {
            console.log("Error occured in loadTemplates.js: " + e)
        }
    })

    fastify.get('/api/getusers',(req,res)=>{
        users.getUsers(db,"users",res)
    })

    fastify.get('/ui/users/manage', (req, res) => {
        try {
            res.sendFile('/manageusers.html');
        } catch (e) {
            console.log("Error occured in /ui/users/manage")
        }
    })




    /* chat history apis */

    fastify.put('/save/chat/history', (req, res) => {
        try {
            let userId = parseInt(req.query.user_id);
            let chatText = req.query.chat_text;
            let roomId = parseInt(req.query.room_id);
            // res.send("userid " + userId + " chat text " + chatText + " room id " + roomId)
            chatHistory.saveChatHistory(db, "chat_history", userId, chatText, roomId, res);
        } catch (e) {
            console.log("Error occured in /save/chat/history: " + e)
        }
    })

    fastify.post('/get/chat/history', (req, res) => {
        try {
            let ri = req.query.room_id;
            chatHistory.getChatHistory(db, "chat_history", ri, res);
        } catch (e) {
            console.log("Error occured in /chat/history: " + e)
        }
    })


    /* rooms apis */

    fastify.get('/api/room/add', (req, res) => {
        try {
            let siteid = req.query.si;
            siteid = ObjectId(siteid)
            let roomname = req.query.rn;
            roomname = roomname.toUpperCase();
            let roomdesc = req.query.rd;
            let creatorid = ObjectId(req.query.ci);
            let enabled = parseInt(req.query.e);
            let updatedbyid = ObjectId(req.query.ubi);
            let def = parseInt(req.query.d);

            let obj = {};
            obj.si = siteid;
            obj.rn = roomname;
            obj.rd = roomdesc;
            // var today = new Date();
            // var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            // var dateTime = date + ' ' + time;
            obj.co = Date.now();
            obj.ci = creatorid;
            obj.e = enabled;
            obj.lu = Date.now();
            obj.ubi = updatedbyid;
            obj.d = def;

            chatRooms.create_chat_room(db, "chatrooms", res, obj, stringify);
        } catch (e) {
            console.log("Error occured in /api/room/add: " + e)
        }
    })

    fastify.get('/api/room/update', (req, res) => {
        try {
            let id = req.query._id;
            id = ObjectId(id);
            let roomname = req.query.rn;
            roomname = roomname.toUpperCase();
            let siteid=ObjectId(req.query.si);
            let roomdesc=req.query.rd;
            let createdon=req.query.co;
            let creatorid=ObjectId(req.query.ci);
            let enabled=parseInt(req.query.e);
            let last_updated=parseFloat(req.query.lu);
            let updated_by_id=ObjectId(req.query.ubi);
            let def=parseInt(req.query.d);

            let obj={};
            obj._id=id;
            obj.si=siteid;
            obj.rn=roomname;
            obj.rd=roomdesc;
            obj.co=createdon;
            obj.ci=creatorid;
            obj.e=enabled;
            obj.lu=last_updated;
            obj.ubi=updated_by_id;
            obj.d=def;

            chatRooms.update_chat_room(db, "chatrooms", obj, res, stringify);
        } catch (e) {
            console.log("Error occured in /api/room/update" , e)
        }
    })

    fastify.get('/api/room/list', (req, res) => {
        try {
            let siteid = req.query.site_id;
            siteid = ObjectId(siteid);
            chatRooms.list_chat_rooms(db, "chatrooms", siteid, res);
        } catch (e) {
            console.log("Error occured in /api/room/list")
        }
    })

    fastify.get('/api/room/delete', (req, res) => {
        try {
            let id = req.query._id;
            id = ObjectId(id)
            chatRooms.delete_chat_room(db, "chatrooms", id, res, stringify);
        } catch (e) {
            console.log("Error occured in /api/room/delete")
        }
    })

    fastify.get('/api/room/all', (req, res) => {
        try {
            chatRooms.get_all_rooms(db, "chatrooms", res);
        } catch (e) {
            console.log("Error occured in /api/room/all")
        }
    })

    fastify.get('/ui/room/manage', (req, res) => {
        try {
            res.sendFile('/managerooms.html');
        } catch (e) {
            console.log("Error occured in /ui/room/manage")
        }
    })

    fastify.get('/api/update/default',(req,res)=>{
        let id=req.query._id;
        id=ObjectId(id);
        let def=parseInt(req.query.d);
        chatRooms.update_default(db,"chatrooms",id,def,res,stringify);
    })


    /* sites apis */

    fastify.get('/api/site/add', (req, res) => {
        try {
            let sitename = req.query.sn;
            sitename = sitename.toUpperCase();
            let domain=req.query.d;
            let obj = {};
            obj.sn = sitename;
            obj.d=domain;
            sites.addSite(db, "sites", res, obj, stringify);
        } catch (e) {
            console.log("Error occured in /api/site/add");
        }

    })

    fastify.get('/api/site/update', (req, res) => {
        try {
            let id = req.query._id;
            let domain=req.query.d;
            id = ObjectId(id);
            let sitename = req.query.sn;
            sitename = sitename.toUpperCase();
            sites.updateSite(db, "sites", res, id, sitename, domain, stringify);
        } catch (e) {
            console.log("Error occured in /api/site/update")
        }
    })

    fastify.get('/api/site/delete', (req, res) => {
        try {
            let id = req.query._id;
            id = ObjectId(id);
            sites.deleteSite(db, "sites", id, res, stringify);
        } catch (e) {
            console.log("Error occured in /api/site/delete")
        }
    })

    fastify.get('/api/sites/all', (req, res) => {
        try {
            sites.get_all_sites(db, "sites", res);
        } catch (e) {
            console.log("Error occured in /api/sites/all")
        }
    })

    fastify.get('/ui/sites/manage', (req, res) => {
        try {
            res.sendFile('/managesites.html');
        } catch (e) {
            console.log("Error occured in /ui/sites/manager")
        }
    })

    fastify.get('/api/getsites',(req,res)=>{
        sites.get_sites(db,"sites",res)
    })

    /* block apis */

    fastify.put('/api/block/add', (req, res) => {
        try {
            let blockerId = req.query.blocker_id;
            let blockedId = req.query.blocked_id;
            let obj = {};
            obj.br = blockerId;
            obj.bd = blockedId;

            block.add_block(db, "blocks", obj, res);
        } catch (e) {
            console.log("Error occured in /api/bloc/add");
        }
    })

    fastify.delete('/api/block/remove', (req, res) => {
        try {
            let blockerId = req.query.blocker_id;
            let blockedId = req.query.blocked_id;

            block.remove_block(db, "blocks", blockerId, blockedId, res);
        } catch (e) {
            console.log("Error occured in /api/block/remove")
        }
    })

    fastify.post('/api/blocks/listbyblockerid', (req, res) => {
        try {
            let blockerId = req.query.blocker_id;
            block.list_blocks_by_blocker_id(db, "blocks", blockerId, res);
        } catch (e) {
            console.log("Error occured in /api/block/listbyblockedid")
        }
    })

    fastify.post('/api/blocks/listbyblockedid', (req, res) => {
        try {
            let blockedId = req.query.blocked_id;
            block.list_blocks_by_blocked_id(db, "blocks", blockedId, res);
        } catch (e) {
            console.log("Error occured in /api/block/listbyblockedid")
        }
    })




    /* facebook sign in */

    fastify.get('/login/facebookdone', function(request, reply) {
        try {
            let token = request.query.code;
            console.log(token);

            let token_url = "https://graph.facebook.com/oauth/access_token?client_id=1875220195983807&redirect_uri=" + API_HOST + "/login/facebookdone&client_secret=853a5b149d4eae04b46898c2ab96ceb0&code=" + token;

            sget.concat({
                    url: token_url,
                    method: 'GET',
                    headers: {
                        //Authorization: 'Bearer ' + token
                    },
                    json: true
                },
                function(err, res, data) {
                    if (err) {
                        reply.send(err)
                        return
                    }
                    let access_token = data.access_token;


                    sget.concat({
                            url: 'https://graph.facebook.com/v6.0/me',
                            method: 'GET',
                            headers: {
                                Authorization: 'Bearer ' + access_token
                            },
                            json: true
                        },
                        function(err, res, data) {

                            let strErrorScreen = `<html><body style="margin:0px;background-color:black;color:white">
                        <div style="
        display: inline-block;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 200px;
        height: 100px;
        margin: auto;
        background-color: black;">SOMETHING WENT WRONG!<BR>PLEASE WAIT
    </div>
               <script>
               setTimeout(function(){
                   window.location.href="/";
               },2000);
               </script>         
                        
                        </body></html>`;
                            if (err) {
                                // reply.send(err)
                                reply.header('Content-Type', 'text/html; charset=utf-8').send(strErrorScreen);
                                return
                            } else {
                                console.log(data);
                                // reply.send(data);
                                fb.processFBID(db, "users", data.id, data.name, reply);

                            }


                            //at this point we got the fb id from data.id and name of the person that logged on
                        }
                    )


                }
            )

        } catch (e) {
            console.log("Error occured in /login/facebook")
        }
    })

    fastify.get('/ui/signin', (req, res) => {
        try {
            res.sendFile("/chat/hejo_signin.html")
                // res.send("hello")
        } catch (e) {
            console.log("Error occured in /ui/signin")
        }
    })



    /* dummy pagination*/
    fastify.get('/getdatainpages', (req, res) => {
        try {
            let start = parseInt(req.query.start);
            let page = parseInt(req.query.page);
            let limit = parseInt(req.query.limit);
            console.log("server side start  " + start);
            console.log("server side page  " + page);
            console.log("server side limit " + limit);
            pagination.pagination(db, "dummy", start, page, limit, res);
        } catch (e) {
            console.log("Error occured in /getdatainpages")
        }
    })


    /* network apis */

    fastify.put('/api/network/add', (req, res) => {
        try {

        } catch (e) {
            console.log("Error occured in /api/network/add")
        }
    })

    fastify.put('/api/network/remove', (req, res) => {
        try {

        } catch (e) {
            console.log("Error occured in /api/network/remove")
        }
    })

    fastify.put('/api/network/list', (req, res) => {
        try {

        } catch (e) {
            console.log("Error occured in /api/network/list")
        }
    })


});