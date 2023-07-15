const express=require('express');
const router=express.Router();
const passport= require('passport');
const Manager= require('../models/manager');
const Car=require('../models/car');

router.get('/register',(req,res)=>{
    res.render('managers/register');
})

router.post('/register',(req,res)=>{
    res.send("LOGGED IN AS MANAGER");
})

router.get('/login',(req,res)=>{
    res.render('managers/login');
})

router.post('/login',(req,res)=>{
   res.redirect('/managers/functions');
})

router.get('/functions',(req,res)=>{
    res.render('managers/functions');
})

router.get('/cars/show',async(req,res)=>{
    const cars=await Car.find({location: 'Ranchi'});
    res.render('managers/cars/show',{cars});
})

router.get('/cars/add',(req,res)=>{
    res.render('managers/cars/add');
})

router.get('/cars/:carNumber',async(req,res)=>{
    const {carNumber}=req.params;
    const car=await Car.findOne({carNumber});
    res.render('managers/cars/details',{car});
})



module.exports= router;