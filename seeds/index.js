const mongoose= require('mongoose');
const {carData}= require('./cars');
const Car= require('../models/car');


const options={useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect('mongodb://127.0.0.1:27017/drive-aura',options)
.then(()=>{
    console.log("CONNECTION OPEN")
})
.catch(err=>{
    console.log("ERROR: ",err)
})



const seedDB=async()=>{
  await Car.deleteMany({});
  for (const car of carData) {
    const newCar = new Car(car);
    await newCar.save();
  }
}



seedDB().then(()=>{
  mongoose.connection.close();
});


  