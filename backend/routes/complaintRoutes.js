const express = require("express")
const router = express.Router()

const complaintController = require("../controllers/complaintController")

const protect = require("../middleware/authMiddleware")
const role = require("../middleware/roleMiddleware")
const upload = require("../middleware/uploadMiddleware")

// Create complaint
router.post(
  "/",
  protect,
  role("staff", "admin"),
  upload.single("file"),
  complaintController.createComplaint
)

// Get complaints
router.get(
  "/",
  protect,
  role("admin", "manager", "secretariat", "staff"),
  complaintController.getComplaints
)

// Assign manager
router.post(
  "/assign",
  protect,
  role("admin"),
  complaintController.assignComplaint
)

// Update status
router.post(
  "/status",
  protect,
  role("manager", "admin"),
  complaintController.updateStatus
)

module.exports = router