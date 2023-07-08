const mongoose=require('mongoose');
const{ Schema }=mongoose;

const carSchema= new Schema({
    name: String,
    type: {
        type: String,
        enum: ["hatchback","sedan","SUV"]
    },
    carNumber: String,
    price: Number,
    seat: Number,
    gear: String
});

const Car=mongoose.model('Car',carSchema);

module.exports=Car;