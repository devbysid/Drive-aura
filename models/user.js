const mongoose=require('mongoose')
const {Schema}=mongoose;

const userSchema =new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    adhar: Number,
    Mobile: Number,
})

const User=mongoose.model('User',userSchema);
module.exports=User;