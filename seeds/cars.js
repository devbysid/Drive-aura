const data= require('./data');

module.exports.carData = [
    ...data.map((car, index) => ({ ...car, carNumber: `MUM${index + 1}`, location: 'Mumbai' })),
    ...data.map((car, index) => ({ ...car, carNumber: `DEL${index + 1}`, location: 'Delhi' })),
    ...data.map((car, index) => ({ ...car, carNumber: `KOL${index + 1}`, location: 'Kolkata' })),
    ...data.map((car, index) => ({ ...car, carNumber: `BEN${index + 1}`, location: 'Bengaluru' })),
    ...data.map((car, index) => ({ ...car, carNumber: `RAN${index + 1}`, location: 'Ranchi' })),
  ];
