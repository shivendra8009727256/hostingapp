const adminModel=require("../models/adminModels")

const createAdmin=async(req,res,next)=>{
    // console.log("REQ.BODY>>>>>>",req.body)
    const {firstName,lastName,email,status}=req.body;
    const saveAdmin=new adminModel(
        {
            firstName,
            lastName,
            email,
            status
        }
    )
    await saveAdmin.save();
    res.status(201).json(saveAdmin)

}

const getAdmin=async(req,res,next)=>{
    // console.log("ADMIN GET API IS WORKING...")
    const data= await adminModel.find();
    res.send(data)
}

module.exports={createAdmin,getAdmin}


