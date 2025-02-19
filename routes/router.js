const express=require("express");
const router=express.Router();
const adminController=require("../controllers/adminController");
 

router.post("/post",adminController.createAdmin)
router.get("/get",adminController.getAdmin)


module.exports=router;




