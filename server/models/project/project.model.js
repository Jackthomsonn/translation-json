const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  baseLocale: {
    required: true,
    type: String
  },
  status: {
    required: false,
    type: String,
    default: 'NEW'
  },
  translations: {
    required: false,
    type: Array
  },
  team: {
    required: true,
    type: Object
  }
})

module.exports = mongoose.model('ProjectModel', projectSchema)