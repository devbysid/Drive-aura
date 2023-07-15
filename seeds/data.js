const data = [
    {
      carName: 'Wagon R',
      type: 'hatchback',
      carNumber: 'ABC123',
      price: 20000,
      seat: 5,
      gear: 'Automatic',
      image: 'https://stimg.cardekho.com/images/car-images/930x620/Maruti/Wagon-R/8835/1646030706414/229_POOLSIDE-BLUE_93bbea.jpg?impolicy=resize&imwidth=420',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'i20',
      type: 'hatchback',
      carNumber: 'XYZ456',
      price: 18000,
      seat: 4,
      gear: 'Manual',
      image: 'https://s7g10.scene7.com/is/image/hyundaiautoever/SW-C16ASWS6K5G17H55602-A7G-NNB.0001?wid=1280&hei=720&fmt=png-alpha&fit=wrap,1',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'Swift',
      type: 'hatchback',
      carNumber: 'DEF789',
      price: 15000,
      seat: 4,
      gear: 'Manual',
      image: 'https://www.carlelo.com/laravel/public/uploads/variant-option/UheH8PpFlB0WdwuAV5Y2FvPUdUALGgP94xIsqHTY.webp',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'Honda City',
      type: 'sedan',
      carNumber: 'GHI987',
      price: 25000,
      seat: 5,
      gear: 'Automatic',
      image: 'https://cdn2.hondacarindia.com/models/2023/city5thGen/exterior/obsidian_blue_pearl/08.png',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'Ciaz',
      type: 'sedan',
      carNumber: 'JKL654',
      price: 22000,
      seat: 5,
      gear: 'Automatic',
      image: 'https://nexaprod5.azureedge.net/-/media/feature/nexawebsitecarbrand/ciaz/banner/1.webp?modified=20220315083821',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'Verna',
      type: 'sedan',
      carNumber: 'MNO321',
      price: 20000,
      seat: 4,
      gear: 'Manual',
      image: 'https://auto.economictimes.indiatimes.com/files/retail_files/verna-1504249732-prod-var.png',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'Creta',
      type: 'SUV',
      carNumber: 'PQR987',
      price: 35000,
      seat: 7,
      gear: 'Automatic',
      image: 'https://imgd.aeplcdn.com/664x374/cw/specialVersions/6487.jpg?v=20190805025920&q=75',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'Scorpio',
      type: 'SUV',
      carNumber: 'STU654',
      price: 32000,
      seat: 5,
      gear: 'Automatic',
      image: 'https://media.zigcdn.com/media/model/2020/Jun/scorpio_360x240.jpg',
      location: 'Ranchi',
      status: 'Available'
    },
    {
      carName: 'Harrier',
      type: 'SUV',
      carNumber: 'VWX321',
      price: 30000,
      seat: 7,
      gear: 'Automatic',
      image: 'https://stimg.cardekho.com/images/car-images/930x620/Tata/Harrier/9098/1655537013855/224_oberon-black_1f1f21.jpg?impolicy=resize&imwidth=420',
      location: 'Ranchi',
      status: 'Available'
    }
  ];

  function generateRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  data.forEach((car)=>{
    switch (car.type) {
      case 'hatchback':
        car.price = generateRandomPrice(400, 800);
        break;
      case 'sedan':
        car.price = generateRandomPrice(1000, 1500);
        break;
      case 'SUV':
        car.price = generateRandomPrice(800, 1500);
        break;
      default:
        car.price = 0;
        break;
    }
  });

  module.exports= data;


  