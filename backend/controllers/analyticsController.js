const Complaint = require("../models/Complaint")

// Detect departments with recurring complaints
exports.recurringIssues = async (req, res) => {

try {

const data = await Complaint.aggregate([
{
$group:{
_id:"$department",
count:{ $sum:1 }
}
},
{
$match:{
count:{ $gte:5 }
}
}
])

res.json(data)

} catch(error) {

console.error(error)
res.status(500).json(error.message)

}

}