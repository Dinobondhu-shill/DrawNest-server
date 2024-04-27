const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

// middleware
app.use(cors());
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.axtsmlj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

      const artCollection = client.db("DrawNest").collection("artCollection")

    app.get('/artCollection', async(req, res)=>{
      const cursor = artCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    })
    // item details 
    app.get('/artCollection/:id', async (req, res)=>{
      const id = req.params.id
      const query = {_id : new ObjectId(id)}
      const result = await artCollection.findOne(query)
      res.send(result)
    })
    // app.get('/artCollection/:email', async (req, res) =>{
    //   const email = req.params.email
    //   const query = {email : email}
    //   const result = await artCollection.find(query).toArray()
    //   res.send(result)
    // })
    app.post('/artCollection', async (req, res)=>{
      const newItem = req.body;
      console.log(newItem);
      const result =await artCollection.insertOne(newItem);
      res.send(result);
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('DrawNest server is running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})