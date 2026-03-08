// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.get("", (req, res) => {
//   res.send("Contact API is ready. Use POST to submit form data.");
// });


// app.post("/api/contact", (req, res) => {
//   const { topic, firstName, lastName, phone, email, details } = req.body;

//   console.log("New lead:", {
//     topic,
//     firstName,
//     lastName,
//     phone,
//     email,
//     details,
//   });

//   res.json({
//     success: true,
//     message: "Form received",
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TSN backend is running");
});

app.post("/api/contact", async (req, res) => {
  const { topic, firstName, lastName, phone, email, details } = req.body;

  console.log("New contact form submission:", req.body);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // change to 'outlook' if needed
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL,
      subject: "New TSN Website Contact Request",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Details:</strong></p>
        <p>${details}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Email error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});