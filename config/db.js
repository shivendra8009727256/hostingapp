const mongoose=require("mongoose");
require('dotenv').config()
const mongo_url=process.env.url;


mongoose.connect("mongodb://localhost:27017/opasbizz").then(()=>{console.log("MongoDB SERVER IS connected ...")}).catch(err=>console.log(`Error.. ${err}`))




