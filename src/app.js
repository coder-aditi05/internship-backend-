const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/internships", internshipRoutes);

const path = require('path');

// Serve frontend files
app.use(express.static(path.join(__dirname, '../../internship-frontend')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // adjust path
});

// fallback route for HTML files
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../../internship-frontend/index.html'));
// });

// last middleware
app.use(errorHandler);

module.exports = app;
