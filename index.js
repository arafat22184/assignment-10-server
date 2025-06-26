require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const { startOfToday, format } = require("date-fns");
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
    //ALL GROUPS Collection
    const allGroupsCollection = client
      .db("assignment-10")
      .collection("allGroupsCollection");

    // Get All Groups
    app.get("/allGroups", async (req, res) => {
      try {
        const searchText = req.query?.search?.trim();

        // No search text: return all blogs
        if (!searchText) {
          const result = await allGroupsCollection.find().toArray();
          return res.json(result);
        }

        // Case-insensitive regex search only on title
        const regex = new RegExp(searchText, "i");

        const result = await allGroupsCollection
          .find({ groupName: { $regex: regex } })
          .toArray();

        return res.json(result);
      } catch (error) {
        res.status(500).json({ error: "Groups Database error" });
      }
    });

    // Get Six Groups
    app.get("/sixGroups", async (req, res) => {
      try {
        const today = format(startOfToday(), "yyyy-MM-dd");

        const groups = await allGroupsCollection
          .find({
            startDate: { $gte: today },
          })
          .sort({ startDate: 1 })
          .limit(8)
          .toArray();

        res.send(groups);
      } catch (error) {
        console.error("Error in /sixGroups:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    // Get Single Group
    app.get("/allGroups/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allGroupsCollection.findOne(query);
      res.send(result);
    });

    app.post("/allGroups", async (req, res) => {
      const newGroup = req.body;
      const result = await allGroupsCollection.insertOne(newGroup);
      res.send(result);
    });

    // Update Group Data
    app.put("/allGroups/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedGroup = req.body;

      const updatedDoc = {
        $set: updatedGroup,
      };

      const result = await allGroupsCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // Delete Group Data
    app.delete("/allGroups/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await allGroupsCollection.deleteOne(query);
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
