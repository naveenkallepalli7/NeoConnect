const mongoose = require("mongoose")

const pollSchema = new mongoose.Schema({

question:String,

options:[String],

votes:[Number]

})

module.exports = mongoose.model("Poll", pollSchema)