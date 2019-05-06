const mongoose = require('mongoose');
const Product = require('../models/product.js');
mongoose.connect('mongodb://localhost/secondProject');

const products = [
    {
        name: 'iPhone',
        price: 1000,
        location: ['Target', 'Walmart', 'Best Buy', 'Amazon']
    },

    {
        name: 'Toaster',
        price: 12,
        location: ['Target', 'Walmart', 'Amazon']
    },

    {
        name: 'Macbook Pro',
        price: 1200,
        location: ['Target', 'Walmart', 'Best Buy', 'Amazon']

    }
  

]

Product.create(products, (err) => {
    if (err) { throw(err) }
    console.log(`Created ${products.length} products`)
    mongoose.connection.close();
  });