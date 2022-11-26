const cors = require('cors');
const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()


// middlewere 

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('monitor dokan server is Running successfully')
})


// mongodb connection 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jle6tre.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productsCollection = client.db('monitorDokan').collection('products')

        const bookingsCollection = client.db('monitorDokan').collection('bookings')




        app.get('/products', async (req, res) => {
            const query = {}
            const result = await productsCollection.find(query).toArray()
            res.send(result)

        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })

        // category 

        app.get('/products/:category', async (req, res) => {
            const category = req.params.category
            const query = { categoryName: category }
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })

        app.post('/bookings', async (req, res) => {
            const query = req.body
            const result = await bookingsCollection.insertOne(query)
            res.send(result)
        })


    }
    finally { }


}
run().catch(err => console.error(err))


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})