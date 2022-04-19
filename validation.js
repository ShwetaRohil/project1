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

client.connect(() => {

    fastify.get('/temp', (req, res) => {
        let fn = req.query.firstname
        let em = req.query.email
        let obj = {};
        obj.fn = fn;
        obj.em = em;

        db.collection("temp").insertOne(obj, (err, result) => {
            console.log(err);
            console.log(result);
            if (err) {
                res.send("Data insertion failed due to validation error")
            } else {
                res.send("data inserted")
            }
        });
    })

    fastify.listen(80, () => {
        console.log("Listening at port 80")
    })


    db.command({
        collMod: "temp",
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["fn", "em"],
                properties: {
                    fn: {
                        bsonType: "string",
                        description: "must be a string and is required",
                    },
                    em: {
                        bsonType: "string",
                        // description: "must be a string and is required",
                        pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
                        description: "email wrong"

                    }
                }
            }
        },
        validationLevel: "strict",
        validationAction: 'error',
    })


})