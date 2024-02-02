const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
require("dotenv").config();
const port = process.env.PORT ||5000;

// Middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fikwith.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   

    const categoryCollection = client.db("DialogifyDB").collection("categories");
    const allCategoriesCollection = client.db("DialogifyDB").collection("allcategoriesdata");
    const allDataCollection = client.db("DialogifyDB").collection("alldata");
    
    // get all data 

    app.get('/all-categories', async(req, res) =>{
      const cursor = allCategoriesCollection.find();
      const allCategories = await cursor.toArray();
      res.send(allCategories)

    });

    app.get('/all-data', async(req, res) =>{
      const cursor = allDataCollection.find();
      const allCategories = await cursor.toArray();
      res.send(allCategories)

    })

    // get categories
    app.get('/categories', async(req, res) =>{
      const cursor = categoryCollection.find();
      const result = await cursor.toArray();
      res.send(result)

    })

  } finally {
    
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Dialogify server is Running!')
})

app.listen(port, () => {
  console.log(`Dialogify server is Running on port ${port}`)
})
