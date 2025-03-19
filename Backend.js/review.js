const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const port = 3006;

// MongoDB connection details
const uri = "mongodb+srv://kiranchaudharycg:IW0hS0AUPz9Ojy4w@cluster0.dglen.mongodb.net/";
const dbName = "categories";

app.use(express.json());
app.use(cors());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Fixed error on line 25
  }
});

const upload = multer({ storage });

// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ironcore.gym.1@gmail.com',
    pass: 'whhy issm gytp uyoz'
  }
});

let db, reviews;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
  try {
    const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    db = client.db(dbName);
    reviews = db.collection("reviews");

    // Start server after successful DB connection
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`); // Fixed error on line 58
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

initializeDatabase();

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST: Submit a new review
app.post('/reviews', upload.single('image'), async (req, res) => {
  try {
    const { name, rating, message } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Fixed error on line 75

    const review = {
      name,
      rating: parseInt(rating),
      message,
      imageUrl,
      approved: false,
      createdAt: new Date()
    };

    await reviews.insertOne(review);

    // Send email to admin
    const mailOptions = {
      from: 'ironcore.gym.1@gmail.com',
      to: 'ironcore.gym.1@gmail.com',
      subject: 'New Review Submission',
      html: `
        <h2>New Review Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Rating:</strong> ${rating} stars</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Review ID:</strong> ${review._id}</p>
        <p>
          <a href="http://localhost:3006/reviews/approve/${review._id}">Click here to approve</a>
        </p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Review submitted successfully and pending approval" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch approved reviews
app.get('/reviews', async (req, res) => {
  try {
    const approvedReviews = await reviews.find({ approved: true }).sort({ createdAt: -1 }).toArray();
    res.json(approvedReviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Approve a review
app.get('/reviews/approve/:id', async (req, res) => {
  try {
    const result = await reviews.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { approved: true } }
    );
    res.send('Review approved successfully');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});