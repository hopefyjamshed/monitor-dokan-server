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

        const usersCollection = client.db('monitorDokan').collection('users')


        // getting data from database 

        app.get('/products', async (req, res) => {
            const query = {}
            const result = await productsCollection.find(query).toArray()
            res.send(result)

        });

        app.get('/categories', async (req, res) => {
            const query = {}
            const result = await productsCollection.find(query).limit(4).toArray()
            res.send(result)
        });

        // find product by categoryName 
        app.get('/products/:category', async (req, res) => {
            const category = req.params.category
            //     const decodedEmail = req.decoded.email
            //     if (email !== decodedEmail) {
            //     return res.status(403).send({ message: 'forbidden access' })
            // }

            const query = { categoryName: category }
            const categories = await productsCollection.find(query).toArray()
            res.send(categories)
        })


        // app.get('/products/:email', async (req, res) => {
        //     const email = req.params.email

        //     const query = { email: email }
        //     const result = await productsCollection.find(query).toArray()
        //     res.send(result)
        // })

        app.get('/myproduct/:email', async (req, res) => {
            const email = req.params.email
            //     const decodedEmail = req.decoded.email
            //     if (email !== decodedEmail) {
            //     return res.status(403).send({ message: 'forbidden access' })
            // }

            const query = { email: email }
            const myproduct = await productsCollection.find(query).toArray()
            res.send(myproduct)
        })



        // insert a product ---
        app.post("/products", async (req, res) => {
            const products = req.body
            const result = productsCollection.insertOne(products)
            res.send(result)
        })


        // get product by id 
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })






        // post data to database 



        app.post('/bookings', async (req, res) => {
            const query = req.body
            const result = await bookingsCollection.insertOne(query)
            res.send(result)
        })

        // user data

        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })

        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray()
            res.send(result)

        })

        app.get('/usertype/:type', async (req, res) => {
            const type = req.params.type
            const filter = { accountType: type }
            const result = await usersCollection.find(filter).toArray()
            res.send(result)
        })

        app.get('/user/:email', async (req, res) => {
            const email = req.params.email


            const query = { email: email }
            const user = await usersCollection.find(query).toArray()
            res.send(user)
        })





        // put data to database 

        app.put('/product/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { Upsert: true }
            const updatedDoc = {
                $set: {
                    status: 'available'
                }
            }
            const result = await productsCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })

        app.put('/product/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: ObjectId(id) }
            const options = { Upsert: true }
            const updatedDoc = {
                $set: {
                    status: 'sold'
                }
            }
            const result = await productsCollection.updateOne(filter, updatedDoc, options)
            res.send(result)
        })




    }
    finally { }


}
run().catch(err => console.error(err))


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})



