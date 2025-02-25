const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI || "mongodb+srv://kiranchaudharycg:IW0hS0AUPz9Ojy4w@cluster0.dglen.mongodb.net//";
const emailSender = process.env.EMAIL_USER || "kiran.chaudhary.cg@gmail.com";
const emailPassword = process.env.EMAIL_PASS || "afkp pcaw rfyb zaya";

if (!uri) {
    console.error("❌ MongoDB URI is missing in .env file");
    process.exit(1);
}

const dbName = "userDB";

// Middleware
app.use(express.json());
app.use(cors());

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
        console.error("❌ Error connecting to MongoDB:", err);
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

// 📌 3️⃣ Modify `/users` route to send an email after saving user
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

        const newUser = { name, email, mobile, designPreference, appointmentDate };
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
            `,
        };

        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully");

        res.status(201).json({ message: "User added successfully, email sent", userId: result.insertedId });
    } catch (err) {
        console.error("❌ Error:", err);
        res.status(500).json({ error: "Error adding user or sending email: " + err.message });
    }
});

// 📌 Add GET request handler to fetch all users
app.get("/users", async (req, res) => {
    try {
        if (!usersCollection) {
            return res.status(500).json({ error: "Database not initialized yet" });
        }

        const users = await usersCollection.find().toArray();
        res.status(200).json(users);
    } catch (err) {
        console.error("❌ Error fetching users:", err);
        res.status(500).json({ error: "Error fetching users: " + err.message });
    }
});