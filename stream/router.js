const {Router} = require('express')
const Chatroom = require('./model')

const router = new Router()


router.get('/stream', (req, res) => {
    console.log("got a request on /stream")
    res.status(200)
    res.send("it works")
})

router.post('/message', async (req, res) => {
    console.log("got a request on /message",req.body)
    const {message} = req.body
    const entity = await Chatroom.create({
        message
    })

    res.status(201)
    res.send("Thanks for your message")
})

module.exports = router