const {Router} = require('express')
const bcrypt = require('bcrypt')
const User = require('./model')
const router = new Router()
router.post('/user', (req, res) => {
    console.log("Got a request on /user")
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
        res.status(400).send({
            message:"please supply a valid emial and password"
        })
    } else {
        User.create({
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        .then( user => {
            res.status(201)
            res.send({status:'OK'})
        })
    }
})

module.exports = router