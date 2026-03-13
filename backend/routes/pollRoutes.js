const router = require("express").Router()

const {
createPoll,
votePoll,
getPolls
} = require("../controllers/pollController")

router.post("/",createPoll)

router.post("/vote",votePoll)

router.get("/",getPolls)

module.exports = router