const cron = require("node-cron")
const Complaint = require("../models/Complaint")

cron.schedule("0 0 * * *", async()=>{

const sevenDaysAgo = new Date(Date.now()-7*24*60*60*1000)

await Complaint.updateMany(
{
status:{$ne:"Resolved"},
createdAt:{$lt:sevenDaysAgo}
},
{
status:"Escalated"
}
)

console.log("Escalation job executed")

})