// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")
require('dotenv').config();
const express = require('express')
const app = express()

app.use(express.json())

app.get('/greet', (req, res) => {
    const time = new Date().toISOString()
    res.json({ 'msg': `hi from get endpoint ${time}` })
})

app.get('/greet/:name', (req, res) => {
    const name = req.params.name
    console.log(`i got name: ${name}`)
    res.json({ 'msg': `got name: ${name}` })
})

app.get('/test', async (req, res) => {
    try {
        const testName = 'Bob'
        const host = req.get('host')
        const response = await fetch(`http://${host}/greet/${testName}`)
        const data = await response.json()
        if (data && data.msg === `got name: ${testName}`) {
            return res.json({ result: 'ok' })
        } else {
            return res.json({ result: 'fail' })
        }


    } catch {
        return res.json({ result: 'fail' })
    }

})

app.post('/action', async (req, res) => {

    if (!req.body || typeof req.body !== 'object' || req.body == 'null')
        return res.status(400).json({ 'msg': "body is malformed" })
    const keys = Object.keys(req.body);
    if (keys.length !== 1 || !keys.includes('action'))
        return res.status(400).json({ 'msg': "body is malformed" })
    const action = req.body.action

    if (action === 'joke') {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single&safe-mode")
        const data = await response.json()
        return res.json({ joke: data.joke.toUpperCase() })
    } else {
        if (action === 'cat fact') {
            const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=11", { headers: { "x-api-key": process.env.CAT_API_KEY } })
            const data = await response.json()
            return res.json({ "length": String(data.length) })
        }else{
            return res.status(400).json({'msg': 'body is malformed'})
        }
    }





})

app.listen(3000)