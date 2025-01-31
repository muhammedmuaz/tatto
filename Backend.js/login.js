

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Use environment variable for MongoDB URI
const uri = process.env.MONGODB_URI || "mongodb+srv://kiranchaudharycg:IW0hS0AUPz9Ojy4w@cluster0.dglen.mongodb.net//";;

if (!uri) {
    console.error("❌ MongoDB URI is missing in .env file");
    process.exit(1);
}

const dbName = "userDB";

// Middleware
app.use(express.json());
app.use(cors());

let db, usersCollection;

// Initialize Database
async function initializeDatabase() {
    try {
        const client = new MongoClient(uri, {
            tls: true, // Ensure SSL/TLS connection
        });

        await client.connect(); // Await connection
        console.log("✅ Connected to MongoDB");

        db = client.db(dbName);
        usersCollection = db.collection("users");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1);
    }
}

// Call DB Initialization
initializeDatabase();

// Routes

// 📌 1️⃣ Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Error fetching users: " + err.message });
    }
});

// 📌 2️⃣ Get a specific user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Error fetching user: " + err.message });
    }
});

// 📌 3️⃣ Add a new user
app.post('/users', async (req, res) => {
    try {
        console.log("📥 Incoming Request Body:", req.body);

        const { name, email, mobile } = req.body;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is missing" });
        }

        if (!name || !email || !mobile) {
            return res.status(400).json({ error: "All fields (name, email, mobile) are required" });
        }

        if (!usersCollection) {
            return res.status(500).json({ error: "Database not initialized yet" });
        }

        const newUser = { name, email, mobile };
        const result = await usersCollection.insertOne(newUser);

        console.log("✅ User Inserted:", result);
        res.status(201).json({ message: "User added successfully", userId: result.insertedId });
    } catch (err) {
        console.error("❌ Error adding user:", err);
        res.status(500).json({ error: "Error adding user: " + err.message });
    }
});
