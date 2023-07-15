const express= require('express');
const path=require('path');
const mongoose=require('mongoose');
const Car=require('./models/car');
const session=require('express-session');
const flash=require('connect-flash');
const User=require('./models/user');
const LocalStrategy=require('passport-local');
const passport=require('passport');
const userRoutes=require('./routes/users');
const ejsMate=require('ejs-mate');
const managerRoutes=require('./routes/managers');



const {Schema}=mongoose;

const app= express();

const options={useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect('mongodb://127.0.0.1:27017/drive-aura',options)
.then(()=>{
    console.log("CONNECTION OPEN")
})
.catch(err=>{
    console.log("ERROR: ",err)
})


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

app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));





app.use((req,res,next)=>{
    // if(req.session.city) res.locals.city=req.session.city;
    res.locals.error=req.flash('error');
    res.locals.currentUser=req.user;
    res.locals.success=req.flash('success');
    res.locals.loginRequired=req.flash('login-req');
    next(); 
})


app.use('/users',userRoutes);
app.use('/managers',managerRoutes);



app.get('/home',(req,res)=>{
    res.render('home');

})


app.listen(3000,()=>{
    console.log("Serving On port 3000");
})
