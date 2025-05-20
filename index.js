const express = require("express");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ydu4ilk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //MY DB ALL Functionalities
    const allGroupsCollection = client
      .db("assignment-10")
      .collection("allGroupsCollection");

    const userGroupCollection = client
      .db("assignment-10")
      .collection("userGroupCollection");

    app.get("/allGroups", async (req, res) => {
      const cursor = allGroupsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/allGroups/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allGroupsCollection.findOne(query);
      res.send(result);
    });

    app.get("/userGroups", async (req, res) => {
      const cursor = userGroupCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/userGroups/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userGroupCollection.findOne(query);
      res.send(result);
    });

    app.post("/userGroups", async (req, res) => {
      const newGroup = req.body;
      const result = await userGroupCollection.insertOne(newGroup);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Assignment 10 server is running");
});

app.listen(port, () => {
  console.log("Assignment 10 server running on port", port);
});
