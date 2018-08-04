const mongoose = require('mongoose')

const translateSchema = new mongoose.Schema({
  json: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('TranslateModel', translateSchema)