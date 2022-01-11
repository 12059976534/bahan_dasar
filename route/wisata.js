const express=require("express");

const router=express.Router();
// const controler=require("../models/wisata")
const controler = require("../controler/index")
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './assets/');
    },
    filename:function(req, file, cb){
        const crypto=require('crypto');
        const random=crypto.randomBytes(10).toString('hex');
        cb(null,random+"_"+file.originalname);
    }
});
const upload = multer({storage:storage});

router.get("/",controler.wisata.index)
router.get("/details/:id",controler.wisata.details)
router.get("/form",controler.wisata.form)
router.post("/post",upload.single('poto'),controler.wisata.post)
// router.post("/edit/:id",upload.single('poto'),controler.wisata.edit)
router.get("/edit/:id",controler.wisata.edit)
router.post("/update",upload.single('poto'),controler.wisata.update)
router.get("/delete/:id",controler.wisata.delete)
router.get("/table",controler.wisata.table)

module.exports=router;