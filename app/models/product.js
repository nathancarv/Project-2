const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: String,
  available: [],
  createdBy: {type: Schema.Types.ObjectId, ref:'User'},
  image: String
})

const Product = mongoose.model('product', ProductSchema)

module.exports = Product;
