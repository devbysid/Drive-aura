const express= require('express');
const path=require('path');
const mongoose=require('mongoose');
const Car=require('./models/car');
const session=require('express-session');
const flash=require('connect-flash');
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

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//res.local
app.use((req,res,next)=>{
   
    res.locals.signUpRequired=req.flash('noSignUp');
    next(); 
})

const options={useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect('mongodb://127.0.0.1:27017/drive-aura',options)
.then(()=>{
    console.log("CONNECTION OPEN")
})
.catch(err=>{
    console.log("ERROR: ",err)
})


app.get('/home',(req,res)=>{
    res.render('home');
})



// routes for users
app.get('/cars',(req,res)=>{
    res.render('cars/index');
})

//using hard-coded data
app.get('/cars/:type',(req,res)=>{
    const {type}=req.params;
    const cars=data.filter((car)=> car.type==type);
    res.render('cars/show',{cars});
})

app.get('/cars/booking/:name',(req,res)=>{
    const {name}=req.params;
    req.session.name=name;
    if(!req.session.email){
        req.flash('noSignUp', "YOU NEED TO SIGN UP FIRST !!!");
        res.redirect('/user/new');
    }
    else{
    const car=data.filter((car)=>car.name==name);
    res.render('cars/booking',{car});
    }
})

app.post('/payment',(req,res)=>{
    const{days,price}=req.body;
    const amount=days*price;
    res.render('cars/payment',{amount});
})

app.post('/confirmation',(req,res)=>{
    const {name}= req.session;
    const {status}=req.body;
    const car=data.filter((car)=> car.name==name);
    res.render('cars/confirmation',{car,status});
})

app.get('/user/new',(req,res)=>{
    res.render('users/new')
})

app.post('/users',(req,res)=>{
    const {email}=req.body;
    req.session.email=email;
    const name=req.session.name;
    if(req.session.name){
      const car=data.filter((car)=>car.name==name);
      res.render('cars/booking',{car});
    }
    else{
      res.redirect('/location');
    }
})

app.get('/location',(req,res)=>{
    res.render('cars/chooseloc');
})

app.post('/location',(req,res)=>{
    const {city} =req.body;
    req.session.city=city;
    res.redirect('/cars')
})


// app.get('/cars/new',(req,res)=>{
//     res.render('cars/new');
// })

// app.get('/cars/:type',async(req,res)=>{
//     const {type}=req.params;
//     const cars=await Car.find({type: type});
//     res.render('cars/show',{cars});
// })


app.post('/cars', async(req, res) => {
    console.log(req.body);
    const newCar=new Car(req.body);
    await newCar.save();
    res.redirect('/cars');
})

// app.use((err, req, res, next)=> {
//     console.error(err.stack);
//     res.status(500).send('Internal Server Error');
// });
  

// User routes

app.get('/users',async(req,res)=>{
    const users=await User.find();
    res.render('users/index');
})

app.listen(3000,()=>{
    console.log("Serving On port 3000")
})
