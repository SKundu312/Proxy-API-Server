const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const rateLimit = require('express-rate-limit')


dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

//rate limiting
const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max:10 // limit each IP to 10 requests per windowMs
})

app.use(limiter)
app.set('trust proxy', 1) // trust first proxy
app.use(cors())

//set static folder
app.use(express.static('public'))

//routes
app.use('/api', require('./routes/index'))

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))