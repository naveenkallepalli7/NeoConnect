const mongoose = require("mongoose")

const complaintSchema = new mongoose.Schema({

trackingId:{
type:String,
required:true
},

category:{
type:String,
required:true
},

department:{
type:String,
required:true
},

location:{
type:String,
required:true
},

severity:{
type:String,
enum:["Low","Medium","High"],
required:true
},

description:{
type:String,
required:true
},

anonymous:{
type:Boolean,
default:false
},

// uploaded file (image/pdf)
file:{
type:String
},

status:{
type:String,
enum:["New","Assigned","In Progress","Pending","Resolved","Escalated"],
default:"New"
},

assignedTo:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

notes:{
type:String
},

createdAt:{
type:Date,
default:Date.now
},

updatedAt:{
type:Date
}

})

// automatically update updatedAt
complaintSchema.pre("save",function(next){
this.updatedAt = new Date()
next()
})

module.exports = mongoose.model("Complaint", complaintSchema)