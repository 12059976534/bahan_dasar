const express=require("express");
const app=express();
const morgan=require("morgan")
const path=require('path')
const route=require("./route/wisata")
// const bodyParser=require("body-parser")


// const mahasiswaroute=require("./routes/mahasiswa")
// const autoriz=require("./routes/autorization")
const cors=require('cors')
app.use(cors({
    origin: "*"
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

// app.use(express.static('public'))
// app.use(express.static('files'))
// app.use('/static', express.static('public'))

app.engine('ejs', require('ejs-locals'));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');

app.use('/',route);
app.use("/assets",express.static("assets")); //asset 


// ===== hendling error ======
app.use((req, res, next) => {
    const error=new Error("Tidak ditemukan");
    error.status = 404;
    next(error);
})



app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message,
            status:error.status
        }
    })
})

// =======================

module.exports=app;
