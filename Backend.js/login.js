const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const nodemailer = require("nodemailer");
const stripe = require("stripe")("sk_test_51QREzbGzvn2xju5eypduzcIjLRQ9VeCVpHd7rEEY6SPsFeB5lCQNjDVg4rjACZHjpGAx9UwNdA0UlDZSXoG6o55s00N5G2vZzn");
require("dotenv").config();
require("dotenv").config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI || "mongodb+srv://kiranchaudharycg:IW0hS0AUPz9Ojy4w@cluster0.dglen.mongodb.net/";
const emailSender = process.env.EMAIL_USER || "kiran.chaudhary.cg@gmail.com";
const emailPassword = process.env.EMAIL_PASS || "afkp pcaw rfyb zaya";

// Log environment variables for debugging
console.log("🔍 Environment Variables:");
console.log("MongoDB URI:", uri ? "Set" : "❌ Not set");
console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY ? "Set" : "❌ Not set");
console.log("Email User:", emailSender);
console.log("Email Password:", emailPassword ? "Set" : "❌ Not set");

// Validate critical environment variables
if (!uri) {
    console.error("❌ MongoDB URI is missing in .env file");
    process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === "your_stripe_secret_key_here") {
    console.error("❌ Stripe Secret Key is missing or not configured in .env file");
    console.error("Please set STRIPE_SECRET_KEY in your .env file with a valid Stripe secret key");
    process.exit(1);
}

if (!emailSender || !emailPassword) {
    console.error("❌ Email credentials are missing or incomplete in .env file");
    process.exit(1);
}

const dbName = "userDB";

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*", // Adjust to match your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));

// Add CSP Middleware to allow Stripe resources
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; font-src 'self' https://js.stripe.com; script-src 'self' https://js.stripe.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.stripe.com;"
    );
    next();
});

let db, usersCollection;

async function initializeDatabase() {
    try {
        const client = new MongoClient(uri, { tls: true });
        await client.connect();
        console.log("✅ Connected to MongoDB");

        db = client.db(dbName);
        usersCollection = db.collection("users");

        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message, err.stack);
        process.exit(1);
    }
}

initializeDatabase();

// 📌 Setup Nodemailer Transporter  
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: emailSender,
        pass: emailPassword,
    },
});

// Verify Nodemailer configuration
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Nodemailer configuration error:", error.message);
    } else {
        console.log("✅ Nodemailer is ready to send emails");
    }
});

// 📌 Route to handle user form submission and email notification
app.post("/users", async (req, res) => {
    try {
        console.log("📥 Incoming Request Body:", req.body);

        const { name, email, mobile, designPreference, appointmentDate } = req.body;

        if (!name || !email || !mobile) {
            return res.status(400).json({ error: "Fields 'name', 'email', and 'mobile' are required" });
        }

        const additionalFields = [designPreference, appointmentDate].filter(field => field !== undefined);
        if (additionalFields.length < 1) {
            return res.status(400).json({ error: "At least one additional field (designPreference or appointmentDate) is required" });
        }

        if (!usersCollection) {
            return res.status(500).json({ error: "Database not initialized yet" });
        }

        const newUser = { name, email, mobile, designPreference, appointmentDate, createdAt: new Date() };
        const result = await usersCollection.insertOne(newUser);
        console.log("✅ User Inserted:", result);

        // 📩 Send Email
        const mailOptions = {
            from: emailSender,
            to: "kiran.chaudhary.cg@gmail.com",
            subject: "New User Form Submission",
            html: `
                <h2>New User Submitted a Form</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile:</strong> ${mobile}</p>
                <p><strong>Design Preference:</strong> ${designPreference || "Not provided"}</p>
                <p><strong>Appointment Date:</strong> ${appointmentDate || "Not provided"}</p>
                <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");

        res.status(201).json({ message: "User added successfully, email sent", userId: result.insertedId });
    } catch (err) {
        console.error("❌ Error in /users route:", err.message, err.stack);
        res.status(500).json({ error: "Error adding user or sending email: " + err.message });
    }
});

// 📌 Route to fetch all users
app.get("/users", async (req, res) => {
    try {
        if (!usersCollection) {
            return res.status(500).json({ error: "Database not initialized yet" });
        }

        const users = await usersCollection.find().toArray();
        console.log("✅ Fetched users:", users.length);
        res.status(200).json(users);
    } catch (err) {
        console.error("❌ Error fetching users:", err.message, err.stack);
        res.status(500).json({ error: "Error fetching users: " + err.message });
    }
});

// 📌 Stripe Payment Intent Route
app.post("/create-payment-intent", async (req, res) => {
    try {
        const { amount } = req.body;
        console.log("📥 Received payment intent request with amount:", amount);

        // Validate amount
        const amountInCents = parseInt(amount, 10);
        if (!amountInCents || amountInCents < 50 || isNaN(amountInCents)) {
            console.log("❌ Invalid amount provided:", amount);
            return res.status(400).json({ 
                error: "Invalid amount: must be a positive integer greater than or equal to 50 cents" 
            });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountInCents,
            currency: "usd",
            payment_method_types: ["card"],
            description: "Tattoo appointment deposit",
            metadata: { integration_check: "accept_a_payment" },
        });

        console.log("✅ Payment Intent created:", paymentIntent.id);
        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
        });
    } catch (err) {
        console.error("❌ Error creating payment intent:", err.message, err.stack);
        res.status(500).json({ error: "Error creating payment intent: " + err.message });
    }
});

// Basic health check route
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});