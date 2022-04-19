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

let myquery = { u: "harry" };
let new_values = {
    $set: {
        c: "Bahamas",
        dp: "616ffa0f67e3d5d669812363.jpg"
    }
}
client.connect(() => {
    db.collection("users").updateOne(myquery, new_values, () => {
        console.log("updated");
    })
})