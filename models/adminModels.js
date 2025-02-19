const mongoose=require("mongoose");

const mongo_Schema= new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    status:{type:Boolean}


})

const admin= mongoose.model("admin",mongo_Schema);

module.exports=admin;

