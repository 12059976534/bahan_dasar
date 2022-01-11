const db=require("../models")
const fs = require('fs');

var controler={};

controler.index=async (req,res,nex)=>{
    db.Wisata.findAll().then(function(data){res.render('index',{data:data})})
}

controler.details=async (req,res,nex)=>{
    // let template = await res.render('detailwisata')
    // let mahasiswa = await model.mahasiswa.findAll({
    //     where:{
    //         id:req.params.id
    //     }
    // });
    await db.Wisata.findOne({where:{id:req.params.id},raw:true}).then(function(data){
        res.render('detailwisata',{data:data})    
    })
}

controler.form=async (req,res,nex)=>{
    let template = await res.render('form')
    res.status(200)(
        template
    )
}
controler.post=async (req,res,nex)=>{

    console.log(req.body.nama)
    console.log(req.body.contak)
    console.log(req.body.deskripsi)
    console.log(req.body.nama)
    
    let create = await db.Wisata.create({
        namawisata:req.body.nama,
        no_pengurus:req.body.contak,
        deskripsi:req.body.deskripsi,
        namawisata:req.body.nama,
        poto:req.file.path,
    })
    res.redirect('/table');
}

controler.table=async (req,res,nex)=>{
    // let template = await res.render('table')
    db.Wisata.findAll().then(function(data){res.render('table',{data:data})})
   
}

controler.edit=async (req,res,nex)=>{
    // let template = await res.render('table')

    // let data = await db.Wisata.findAll({
    //     where:{
    //         id:req.params.id
    //     }
    //     });
    //     let template = await res.render('update',{data:data})


        await db.Wisata.findOne({where:{id:req.params.id},raw:true}).then(function(data){
            res.render('update',{data:data})    
        })    
   
}

controler.delete=async(req,res,nex)=>{
    try {
        let data = await db.Wisata.findAll({
            attributes:['poto'],
            where:{
                id:req.params.id
            }
            });


        let wisata = await db.Wisata.destroy({
            where:{
                id:req.params.id
            }
        });
        const name=data[0].dataValues.poto
        const path=name
        fs.unlink(path, (err) => {
            if(err){
                console.error(err)
            }else{
                console.log(path)
            }
        })

    

        res.redirect('/table');
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

controler.update=async (req,res,nex)=>{
    // let template = await res.render('table')

    let data = await db.Wisata.findAll({
        attributes:['poto'],
        where:{
            id: req.body.id
        }
        });
   

    let edit = await db.Wisata.update({
        namawisata:req.body.nama,
        no_pengurus:req.body.contak,
        deskripsi:req.body.deskripsi,
        namawisata:req.body.nama,
        poto:req.file.path
    },{
        where:{
            id: req.body.id
        }
    });
    
    const name=data[0].dataValues.poto
    const path=name
    fs.unlink(path, (err) => {
        if(err){
            console.error(err)
        }else{
            console.log(path)
        }
    })
   
    res.redirect('/table');
   
}

module.exports=controler;