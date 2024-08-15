const express = require('express')
const Router = express.Router()

const {createShortUrl,getUrl} = require('../controller/url.controller')

Router.post('/create-shortUrl',createShortUrl)
Router.get('/:urlId',getUrl)

module.exports = Router;