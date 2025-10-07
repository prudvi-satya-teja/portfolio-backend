const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Configure your email transporter
const transporter = nodemailer.createTransport({
    service: "Gmail", // or another email provider
    auth: {
        user: "prudvisatyateja1234@gmail.com", // your email
        pass: "olks qnyf khvr lvog", // use App Password if using Gmail
    },
});

// Endpoint to send contact messages
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // 1️⃣ Send email to yourself
        await transporter.sendMail({
            from: `"Website Contact" <${email}>`,
            to: "prudvisatyateja1234@gmail.com",
            subject: `New message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        });

        // 2️⃣ Send auto-reply to user
        await transporter.sendMail({
            from: `"Prudvi Satya Teja" <prudvisatyateja1234@gmail.com>`,
            to: email,
            subject: "Thank you for contacting me!",
            text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\nBest regards,\nPrudvi`,
        });

        res.status(200).json({ success: true, message: "Emails sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to send emails." });
    }
});

setInterval(() => {
    try {
        fetch("https://portfolio-backend-n8lx.onrender.com");
    } catch (e) {}
}, 840000);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
