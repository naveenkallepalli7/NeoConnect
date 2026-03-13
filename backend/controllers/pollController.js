const Poll = require("../models/Poll")

exports.createPoll = async(req,res)=>{

const {question,options} = req.body

const poll = await Poll.create({

question,
options,
votes:new Array(options.length).fill(0)

})

res.json(poll)

}

exports.votePoll = async(req,res)=>{

const {pollId,optionIndex} = req.body

const poll = await Poll.findById(pollId)

poll.votes[optionIndex] += 1

await poll.save()

res.json(poll)

}

exports.getPolls = async(req,res)=>{

const polls = await Poll.find()

res.json(polls)

}