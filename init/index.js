const mongoose = require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js");
let MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main()
.then((res)=>{
    console.log("The DB is connected")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>
        ({...obj,owner:"659a02f52492194af984f894"})
    )
    await Listing.insertMany(initData.data);
    console.log("The data is initialized")
}

initDB();