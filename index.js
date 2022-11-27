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

        


        // post data to database 


        app.post('/bookings', async (req, res) => {
            const query = req.body
            const result = await bookingsCollection.insertOne(query)
            res.send(result)
        })

        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })


    }
    finally { }


}
run().catch(err => console.error(err))


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})


// app.get('/products/:products', async (req, res) => {
        //     const products = req.params.products
        //     const filter = { products: products }
        //     const result = await productsCollection.find(filter).toArray()
        //     res.send(result)
        // })
        // app.get('/products/:name', async (req, res) => {
        //     const name = req.params.name
        //     const filter = { name: name }
        //     const result = await productsCollection.find(filter).toArray()
        //     res.send(result)
        // })


        // weapon of danger 
        // app.post('/addname', async (req, res) => {
        //     const filter = {}
        //     const options = { Upsert: true }
        //     const updatedDoc = {
        //         $set: {
        //             products: [

        //                 {
        //                     "name": "Dell E1916HV 18.5 Inch LED Monitor",
        //                     "image": "https://www.startech.com.bd/image/cache/catalog/monitor/dell/e1916hv/e1916hv-01-228x228.webp",
        //                     "location": "chittagong, Bangladesh",
        //                     "resalePrice": " 4,000",
        //                     "originalPrice": "9,900",
        //                     "useYear": 2,
        //                     "postDate": "25.11.2022",
        //                     "sellersName": "Md Al Azayeen Ahrar",
        //                     "condition": "good",
        //                     "purchesYear": 2020,
        //                     "phone": "01987633432",
        //                     "discription": "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam fugiat ad dolor repellendus. Corporis aliquam nesciunt, id atque iure officia voluptatem sint quis, sapiente enim maiores iste ducimus dignissimos quos, illum aliquid sunt! Autem harum sed aliquid nostrum, corporis repudiandae assumenda quas soluta porro explicabo! Ad laborum possimus dignissimos veritatis labore dicta adipisci atque sit in velit neque, laudantium, accusamus quibusdam a eveniet."
        //                 }

        //             ]
        //         }
        //     }
        //     const result = await productsCollection.updateOne(filter, updatedDoc, options)
        //     res.send(result)
        // })