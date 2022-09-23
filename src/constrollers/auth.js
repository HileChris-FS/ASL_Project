const express = require('express')
const router = express.Router()
const request = require('request')
const querystring = require('querystring')

router.get('/login', (req, res) => {
    res.render('auth/login')
}) 

router.get('/callback', async (req, res) => {
    const{ code }= req.query
    await request({
        uri: 'https://github.com/login/oauth/access_token',
        qs: {
            client_id: "6ff711f9277a83f1c3b7",
            client_secret: "70561a35d6619b18e64b64346df5df236fb507b1",
            code 
        }
    }, async (error, response, body) =>{
        const { access_token } = querystring.parse(body)
        req.session.access_token = access_token
        res.redirect('/')
    })
})

module.exports = router