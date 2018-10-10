const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('TeamModel', teamSchema)