let pagination = async function(db, cName, st, page, limit, res) {
    let start = st;

    if (Number.isNaN(start) && page != 1) {
        start = (page - 1) * limit;
    }

    if (page === 1) {
        start = 1
    }

    let totalCount = await db.collection(cName).find().count();

    let last_page = Math.floor(totalCount / limit)

    console.log("total count " + totalCount);


    await db.collection(cName).find().sort({
        "_id": -1
    }).skip(start).limit(limit).toArray((err, result) => {
        if (err) {
            console.log(err);
        } else {
            let obj = {};
            obj.Total_Entries = totalCount;
            obj.Shown_Entries = limit;
            obj.pageNo = page;
            obj.first_page = "https://api.hejo.io/getdatainpages?limit=20&page=1"
            if (page != 1) {
                obj.previous_page = "https://api.hejo.io/getdatainpages?limit=20&page=" + (page - 1);
            }
            if (page != last_page) {
                obj.next_page = "https://api.hejo.io/getdatainpages?limit=20&page=" + (page + 1);
            }
            obj.last_page = "https://api.hejo.io/getdatainpages?limit=20&page=" + (last_page);
            obj.documents = result
            res.send(obj);
        }
    })

}


module.exports = {
    pagination
}