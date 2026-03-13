const Complaint = require("../models/Complaint")

// Generate Tracking ID
const generateTrackingId = async () => {

  const count = await Complaint.countDocuments()
  const year = new Date().getFullYear()

  return `NEO-${year}-${String(count + 1).padStart(3,"0")}`

}

// Create Complaint
exports.createComplaint = async (req,res)=>{

try{

const trackingId = await generateTrackingId()

const complaint = await Complaint.create({

trackingId: trackingId,

category: req.body.category,
department: req.body.department,
location: req.body.location,
severity: req.body.severity,
description: req.body.description,

anonymous: req.body.anonymous === "true",

file: req.file ? req.file.filename : null

})

res.json(complaint)

}catch(error){

console.error("Create Complaint Error:", error)

res.status(500).json(error.message)

}

}

// Get Complaints
exports.getComplaints = async (req,res)=>{

  try{

    const complaints = await Complaint
      .find()
      .populate("assignedTo","name email")

    res.json(complaints)

  }catch(error){

    res.status(500).json(error.message)

  }

}

// Assign Complaint
exports.assignComplaint = async (req,res)=>{

try{

const { complaintId, managerId } = req.body

if(!complaintId || !managerId){
return res.status(400).json("Missing complaintId or managerId")
}

const complaint = await Complaint.findById(complaintId)

if(!complaint){
return res.status(404).json("Complaint not found")
}

complaint.assignedTo = managerId
complaint.status = "Assigned"

await complaint.save()

res.json(complaint)

}catch(error){

console.error("Assign Complaint Error:", error)

res.status(500).json(error.message)

}

}
// Update Status
exports.updateStatus = async (req,res)=>{

  try{

    const { complaintId, status, notes } = req.body

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        status,
        notes
      },
      { new: true }
    )

    res.json(complaint)

  }catch(error){

    res.status(500).json(error.message)

  }

}