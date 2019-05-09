const mongoose = require('mongoose');
const Product = require('../app/models/product.js');
mongoose.connect('mongodb://localhost/secondProject');

const products = [
    {
        name: 'iPhone XS Max 64 GB',
        available:[ 
            {location: 'Best Buy', price: 1009.99}
        ] ,
        // available:
        //     {location: 'Best Buy', price: 1009.99},
           
        
    },

    {
        name: 'Logitech MX Master Wireless Mouse',
        available: [
            {location: 'Amazon', price: 63.95}, 
        ],
        // available: 
        //     {location: 'Amazon', price: 63.95}, 
            
            
    },

    {
        name: '13-inch MacBook Pro - 2018',
        available: [
            {location: 'Apple', price: 1299}, 
        ],
        // available: 
        //     {location: 'Amazon', price: 63.95}, 
            
            

    }
  

]

Product.create(products, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${products.length} products`)
    mongoose.connection.close();
  });