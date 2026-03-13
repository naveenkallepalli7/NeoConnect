const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")

dotenv.config()

const app = express()

// connect database
connectDB()

// run escalation job
require("./utils/escalationJob")

// middleware
app.use(cors())
app.use(express.json())

// serve uploaded files
app.use("/uploads", express.static("uploads"))

// routes
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/complaints", require("./routes/complaintRoutes"))
app.use("/api/polls", require("./routes/pollRoutes"))
app.use("/api/analytics", require("./routes/analyticsRoutes"))

// test route
app.get("/", (req,res)=>{
res.send("NeoConnect API Running")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
console.log(`Server running on port ${PORT}`)
})