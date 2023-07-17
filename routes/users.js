const express= require('express');
const router=express.Router();
const passport= require('passport');
const User=require('../models/user');
const { isLoggedIn, storeReturnTo } = require('../middleware');
const Car =require('../models/car');
const {Booking}=require('../models/booking');


router.get('/register',(req,res)=>{
    res.render('users/register');
})

router.post('/register', storeReturnTo,async(req,res,next)=>{
    const {email,username,password}=req.body;
    const user=new User({email,username});
    const newUser=await User.register(user,password);
    req.login(newUser, (err)=>{
        if(err) return next(err);
        const redirectUrl= res.locals.returnTo || 'users/cars/location';
        res.redirect(redirectUrl);
    }) 
})

router.get('/login',(req,res)=>{
    res.render('users/login');
})

router.post('/login', storeReturnTo,passport.authenticate('local', {failureFlash: true, failureRedirect: '/users/login'}),(req,res)=>{
    req.flash('success','Welcome back!');
    const redirectUrl= res.locals.returnTo || '/users/cars/location';
    res.redirect(redirectUrl);
})

router.get('/cars',(req,res)=>{
    res.render('users/cars/index');
})


router.get('/cars/booking/:carNumber',isLoggedIn,async(req,res)=>{
    const {carNumber}=req.params;
    req.session.carNumber=carNumber;
    console.log(req.session.carNumber);
    const car= await Car.find({carNumber});
    res.render('users/cars/booking',{car});
})    

router.post('/cars/payment',isLoggedIn,async(req,res)=>{
    const{days,price,carPickupDate}=req.body;
    const bookingDate= new Date();
    const carNumber=req.session.carNumber;
    const username=req.user.username;
    const amount=days*price;
    const bookingDetails={
       username,
       bookingDate,
       carPickupDate,
       carNumber,
       amount
    }
    const booking=new Booking(bookingDetails);
    await booking.save();
    res.render('users/cars/payment',{amount});
})    

router.post('/cars/confirmation',isLoggedIn,async(req,res)=>{
    const {carNumber}= req.session;
    const {username}= req.user.username;
    const {paymentStatus}=req.body;
    await Booking.findOneAndUpdate({carNumber},{paymentStatus});
    const car=await Car.find({carNumber});
    res.render('users/cars/confirmation',{car,paymentStatus,username});
})    


router.get('/cars/location',(req,res)=>{
    res.render('users/cars/chooseloc');
})

router.post('/cars/location',(req,res)=>{
    const {city} =req.body;
    req.session.city=city;
    res.redirect('/users/cars');
})

router.get('/cars/:type',async(req,res)=>{
    const {type}=req.params;
    const cars=await Car.find({type, location: req.session.city}); 
    res.render('users/cars/show',{cars});
})

router.get('/logout', (req, res) => {
    req.logout((err)=>{
        if (err) {
            return next(err);
        }
        req.flash('success','Goodbye!');
        res.redirect('/home');
    });
    
 
});

module.exports= router;