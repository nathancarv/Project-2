const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CelebSchema = new Schema({
  name:       String,
  occupation: String, 
  catchPhrase:String
})

const Celebrity = mongoose.model('celebrity', CelebSchema)

module.exports = Celebrity;
