const cors = require('cors');
const express = require('express');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()


// middlewere 

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('monitor dokan server is Running successfully')
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})