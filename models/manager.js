const mongoose= require('mongoose');
const {Schema}= mongoose;
const passportLocalMongoose=require('passport-local-mongoose');

const ManagerSchema=new Schema({
    email: {
        type: String,
        required: true
    },
    location: String
})

ManagerSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('Manager',ManagerSchema);
