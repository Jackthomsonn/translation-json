const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
  url: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('LanguageModel', languageSchema)