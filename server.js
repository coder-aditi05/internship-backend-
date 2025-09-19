require('dotenv').config();
const express = require("express");
const path = require("path");
const connectDB = require("./src/config/db");

const authRoutes = require("./src/routes/authRoutes");
const internshipRoutes = require("./src/routes/internshipRoutes");
const authMiddleware = require("./src/middleware/authMiddleware");
const studentProfileRoutes =  require("./src/routes/studentProfileRoutes");

const app = express();
const fileUpload = require("express-fileupload");

// middleware
app.use(fileUpload());


app.use(express.json()); // parse JSON requests

connectDB();

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/internships", authMiddleware, internshipRoutes);

app.use("/api/studentprofile",studentProfileRoutes);


// Serve frontend static files
app.use(express.static(path.join(__dirname, "../internship-frontend")));
app.use("/uploads", express.static("uploads"));


// SPA catch-all for frontend routes
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../internship-frontend/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// // server.js
// require('dotenv').config();
// const express = require("express");
// const path = require("path");
// const connectDB = require("./src/config/db"); // your MongoDB connection
// const authRoutes = require("./src/routes/authRoutes"); // adjust path if needed

// const app = express();

// // --- Middleware ---
// app.use(express.json()); // parse JSON requests

// // --- Connect to MongoDB ---
// connectDB();

// // --- API Routes ---
// app.use("/api/auth", authRoutes);
// // Add more API routes here, e.g., /api/users, /api/internships

// // --- Serve Frontend Static Files ---
// app.use(express.static(path.join(__dirname, "../internship-frontend")));

// // --- Catch-all route for SPA frontend routing ---
// app.get(/^\/.*$/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../internship-frontend/index.html"));
// });

// // --- Start Server ---
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




// require("dotenv").config();
// const express = require("express");
// const path = require("path");
// const mongoose = require("mongoose");


// const app = express();
// const PORT = process.env.PORT || 5000;



// // DB connect
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// // Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve frontend static files
// // app.use(express.static(path.join(__dirname, "../frontend")));
// // app.use(express.static(path.join(__dirname, "../internship-frontend")));

// // API routes
// app.use("/api/auth", require("./src/routes/authRoutes"));
// app.use("/api/internships", require("./src/routes/internshipRoutes"));
// app.use(express.static(path.join(__dirname, "../internship-frontend")));

// app.get(/^\/.*$/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../internship-frontend/index.html"));
// })
// // Start server
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));




// require('dotenv').config();

// const app = require('./src/app');
// const connectDB = require('./src/config/db');
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// connectDB();

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));