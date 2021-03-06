const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const streamRouter = require('./stream/router')
const userRouter = require('./user/router')

const app = express()
const port = process.env.Port || 5000
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(cors())
app.listen(port, () => console.log(`Server running on port ${port}`))

app.get('/', (req, res) => {
    console.log("get an request on /")
    res.status(200)
    res.send("hello world!")
})

app.use(streamRouter)
app.use(userRouter)