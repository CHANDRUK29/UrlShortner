const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/shortUrl').then(() => {
    console.log(`mongodb connection successfull`)
}).catch((err) => {
    console.log(`mongodb connection failure ${err}`)
})

app.use('/', require('./routes/url.routes'))

app.listen(6500, () => {
    console.log(`server is listening on port 6500`)
})