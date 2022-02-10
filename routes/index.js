const url=require('url');
const router = require('express').Router()
const apiCache=require('apicache');
const needle = require('needle')

const API_KEY_NAME = process.env.API_KEY_NAME
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_VALUE= process.env.API_KEY_VALUE

//init cache
const cache = apiCache.middleware


router.get('/',cache('2 minutes'), async(req, res) => {
     try {
          console.log(url.parse(req.url, true).query)

          const params = new URLSearchParams({
               [API_KEY_NAME]: API_KEY_VALUE,
               ...url.parse(req.url, true).query
          })
          
          const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
          const data = apiRes.body;
          
          //log the request to the public api
          if (process.env.NODE_ENV !== 'production') {
               console.log(`REQUEST:${API_BASE_URL}?${params}`)
          }

		res.status(200).send(data); 
     } catch (err) {
          res.status(500).send(err);
     }
})

module.exports = router
