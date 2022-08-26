const  express=require('express')
const app= express()
const mongoose=require("mongoose")  
const passport=require("passport")
const localstrategy=require("passport-local").Strategy
const  session=require("express-session")
const MongoStore=require("connect-mongo")
const  flash=require("connect-flash")
require("dotenv").config()
app.use(express.urlencoded({extended:true}));
app.use(express.json({limit:'1mb'}))
app.use(flash())
app.set("view engine","ejs")
app.use(express.static('views'))
app.use(express.static('assets'))

const cors = require('cors');
app.use(cors());


mongoose.connect( process.env.db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((res)=>{
        app.listen(process.env.PORT ||3232,()=>{
            console.log('this sheldon project ')
    })
  
    console.log('success sheldon project ')})
    .catch((err)=>{console.log(err)})


    require("./passport/passport")()
    app.use(session({
        secret:'sheldon',
        resave:false,
        saveUninitialized:true,
        store: MongoStore.create({
            mongoUrl:process.env.db
        })
    })) 
    //passport 
    app.use(passport.initialize())
    app.use(passport.session())

   
app.get('/',(req,res)=>{
    res.send('this is home page ')
})

const  signup=require('./controller/signup')
app.use(signup)

//route  to login  
const  login =require("./controller/login")
app.use(login)

//route  to dashboard
const das=require("./controller/dashboard")
app.use(das)

//route to api generation page  
const api_key=require('./controller/api_generation')
app.use(api_key)

app.post('/summa',(req,res)=>{
    console.log('in summa')
    console.log(req.body)
    res.send('ok mh')
})