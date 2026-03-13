const express = require("express")
const router = express.Router()

const { recurringIssues } = require("../controllers/analyticsController")

router.get("/recurring", recurringIssues)

module.exports = router