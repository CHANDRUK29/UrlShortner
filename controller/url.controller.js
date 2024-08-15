const URL = require('../models/url')
const {nanoid} = require('nanoid')
const {validateUrl} = require('../utils/urlvalidator')


const createShortUrl = async(req,res)=>{
    try {
        const {originalUrl} = req.body
        if(!originalUrl) return res.status(400).json({error:'originalUrl is empty'})
        const baseUrl = 'http://localhost:6500'
        const urlId = nanoid()
        if(validateUrl(originalUrl)){
            console.log('first')
            let findUrl = await URL.findOne({originalUrl})
            console.log("test-->",findUrl)
            if(findUrl){
                console.log('second')
                return res.status(200).json({url: findUrl})
            }else{
                console.log('third')
                const shortUrl = `${baseUrl}/${urlId}`
                let createurl = await new URL({
                    shortUrl,
                    originalUrl,
                    urlId,
                    date : new Date()
                }).save()
                console.log("--->",createurl)
                // await createurl.save();
                return res.status(200).json({message:"ShortUrl generated",data : createurl})
            }
        }
        return res.status(400).json({error :"invalid Original Url"})
    } catch (error) {
        return error
    }
}

const getUrl = async(req,res)=>{
    try {
        let {urlId} = req.params;
        const url = await URL.findOne({urlId:urlId})
        if(url){
            await URL.updateOne(
                {
                  urlId:urlId,
                },
                { $inc: { clicks: 1 } }
              );
              return res.redirect(url.originalUrl);
        }
        return res.status(400).json({error:'Url not found'})
    } catch (error) {
        return res.status(500).json({error:'internal server error',errorDesc: error})
    }
}

module.exports =  {
    createShortUrl,
    getUrl
}