const express = require('express')
const redis = require('redis')
const process = require('process')

const app = express()
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})
// 0 is status code: exit and everything is ok
client.set('visits', 0)

app.get('/', (req, res) => {
    // process.exit(0)
    client.get('visits', (err, visits) => {
        res.send('number of visits is ' + visits)
        client.set('visits', parseInt(visits) + 1)
    })
})


app.listen(8081, () => {
    console.log('Listening on port 8081')
})