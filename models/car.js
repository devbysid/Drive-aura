const mongoose=require('mongoose');
const{ Schema }=mongoose;

const carSchema= new Schema({
    carName: String,
    type: {
        type: String,
        enum: ["hatchback","sedan","SUV"]
    },
    carNumber:{
        type: String,
        unique: true
    },
    price: Number,
    seat: Number,
    gear: String,
    image: String,
    location: String,
    status: {
        type: String,
        enum: ["Available", "Not Available"]
    }
});


module.exports=mongoose.model('Car',carSchema);