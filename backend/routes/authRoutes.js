const router = require("express").Router()

const {
register,
login,
getManagers
} = require("../controllers/authController")

router.post("/register",register)

router.post("/login",login)

router.get("/managers",getManagers)

module.exports = router