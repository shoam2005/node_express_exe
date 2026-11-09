// Express.js Intro - write your server here.
// Run it with: node index.js   (stop it with Ctrl + C)

// Part 1: create an express app, a GET /greet endpoint and app.listen(3000)

// Part 2: GET /greet/:name  and  GET /test (calls /greet/:name with fetch)

// Part 3: POST /action  ("joke" / "cat fact", otherwise 400 "body is malformed")

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

app.post('')

app.listen(3000)