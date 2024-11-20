import express from "express";
const app = express();
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/send-email", async (req, res) => {
  try {
    let { firstName, lastName, email, phone, message } = req.body;
    console.log(req.body);
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider (Gmail, Yahoo, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password (or app password)
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // List of recipients
      subject: "contacting via portfolio",

      html: `
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invitation to Register</title>
          <style>
              body {
                  font-family: 'Roboto', sans-serif;
                  background-color: #f4f4f4;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
              }
              .container {
                  background-color: white;
                  border: 1px solid #ddd;
                  border-radius: 8px;
                  padding: 20px;
                  width: 350px;
                  font-size: 15px;
                  font-weight: 500;
                  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
              }
              .container p {
                  margin-bottom: 16px;
                  line-height: 1.6;
              }
              a {
                  color: #007bff;
                  text-decoration: none;
                  font-weight: 600;
              }
              a:hover {
                  text-decoration: underline;
              }
          </style>
      </head>
      <body>
      
          <div class="container">
              <p>name:"${firstName} ${lastName}"</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone Number:</strong> ${phone}</p>
              <p><strong>Message:</strong>${message}</p>
          </div>
      
      </body>
      </html>
      
            `, // Plain text body
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json("email sent");
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
});
