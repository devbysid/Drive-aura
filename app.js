const express= require('express');
const path=require('path');
const mongoose=require('mongoose');
const Car=require('./models/car');
const session=require('express-session');
const flash=require('connect-flash');
const User=require('./models/user');
const LocalStrategy=require('passport-local');
const passport=require('passport');
//temp data
const data=require('./data');

const {Schema}=mongoose;

const app= express();

const sessionOptions={
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
};
app.use((session(sessionOptions)));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


const options={useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect('mongodb://127.0.0.1:27017/drive-aura',options)
.then(()=>{
    console.log("CONNECTION OPEN")
})
.catch(err=>{
    console.log("ERROR: ",err)
})


//res.local
app.use((req,res,next)=>{
    
    res.locals.signUpRequired=req.flash('noSignUp');
    next(); 
})


app.post('/users/register',async(req,res)=>{
    const {email,username,password}=req.body;
    const user=new User({email,username});
    const newUser=await User.register(user,password);
    req.session.username=username;
    const carname=req.session.carname;
    if(req.session.carname){
      const car=data.filter((car)=>car.name==carname);
      res.render('users/cars/booking',{car});
    }
    else{
      res.redirect('/users/cars/location');
    }
})



app.get('/home',(req,res)=>{
    res.render('home');
})


//using hard-coded data

// routes for users
app.get('/users/cars',(req,res)=>{
    res.render('users/cars/index');
})

app.get('/users/cars/booking/:name',(req,res)=>{
    const {name}=req.params;
    req.session.carname=name;
    if(!req.session.username){
        req.flash('noSignUp', "YOU NEED TO SIGN UP FIRST !!!");
        res.redirect('/users/register');
    }
    else{
    const car=data.filter((car)=>car.name==name);
    res.render('users/cars/booking',{car});
    }
})

app.post('/users/cars/payment',(req,res)=>{
    const{days,price}=req.body;
    const amount=days*price;
    res.render('users/cars/payment',{amount});
})

app.post('/users/cars/confirmation',(req,res)=>{
    const {carname,username}= req.session;
    const {status}=req.body;
    const car=data.filter((car)=> car.name==carname);
    res.render('users/cars/confirmation',{car,status,username});
})

app.get('/users/register',(req,res)=>{
    res.render('users/register')
})



app.get('/users/cars/location',(req,res)=>{
    res.render('users/cars/chooseloc');
})

app.post('/users/cars/location',(req,res)=>{
    const {city} =req.body;
    req.session.city=city;
    res.redirect('/users/cars');
})

app.get('/users/cars/:type',(req,res)=>{
    const {type}=req.params;
    const cars=data.filter((car)=> car.type==type);
    res.render('users/cars/show',{cars});
})


// app.use((err, req, res, next)=> {
//     console.error(err.stack);
//     res.status(500).send('Internal Server Error');
// });
  





app.listen(3000,()=>{
    console.log("Serving On port 3000")
})
