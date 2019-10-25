const {Router} = require('express')
const Chatroom = require('./model')
const Sse = require('json-sse')

const router = new Router()
const stream = new Sse()


router.get('/stream', async (req, res) => {
    console.log("got a request on /stream")

    const messages = await Chatroom.findAll()
    const data = JSON.stringify(messages)
    // console.log("messages in db:", data)
    stream.updateInit(data)
    stream.init(req, res)
})

router.post('/message', async (req, res) => {
    console.log("got a request on /message",req.body)
    const {message} = req.body
    const entity = await Chatroom.create({
        message
    })


    const messages = await Chatroom.findAll()
    const data = JSON.stringify(messages)
    // console.log("messages in db:", data)
    stream.send(data)

    res.status(201)
    res.send("Thanks for your message")
})

module.exports = router