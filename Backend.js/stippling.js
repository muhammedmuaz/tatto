
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3011;

// ✅ Use environment variables for security
const uri = process.env.MONGO_URI || "mongodb+srv://kiranchaudharycg:IW0hS0AUPz9Ojy4w@cluster0.dglen.mongodb.net/?retryWrites=true&w=majority&tls=true";
const dbName = "smallcategory";

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure multer for file uploads
const storage = multer.diskStorage({
    destination: uploadDir, // Save files to the 'uploads' folder
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// ✅ Serve uploaded images statically
app.use("/uploads", express.static(uploadDir));

// ✅ MongoDB Connection Function
let db, smallcategory;
async function initializeDatabase() {
    try {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true, // Deprecated but still works
            tls: true, // Ensure TLS is enabled
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });

        await client.connect();
        console.log("✅ Connected to MongoDB");

        db = client.db(dbName);
        smallcategory = db.collection("stippling");

        // ✅ Start server after DB connection
        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err);
        process.exit(1); // Exit if DB connection fails
    }
}

// ✅ Initialize Database
initializeDatabase();

// ✅ API Routes

// 🟢 GET: List all offers
app.get("/stippling", async (req, res) => {
    try {
        const allOffers = await smallcategory.find().toArray();
        res.status(200).json(allOffers);
    } catch (err) {
        res.status(500).send("Error fetching offers: " + err.message);
    }
});

// 🟢 POST: Upload an offer with an image
app.post("/stippling", upload.single("image"), async (req, res) => {
    try {
        const newOffer = {
            name: req.body.name,
            price: req.body.price,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        };

        const result = await offer.insertOne(newOffer);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send("Error saving offer: " + err.message);
    }
});


