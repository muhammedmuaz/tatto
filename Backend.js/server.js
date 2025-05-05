const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 4567;

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb+srv://kiranchaudharycg:IW0hS0AUPz9Ojy4w@cluster0.dglen.mongodb.net//';
const dbName = 'userDB';

if (!uri) {
    console.error('❌ MongoDB URI is missing in .env file');
    process.exit(1);
}

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(uri, {
    dbName: dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(port, () => {
        console.log(`🚀 Server running at http://localhost:${port}`);
    });
})
.catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1);
});
