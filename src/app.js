const express = require('express');
const app = express();
const testRoutes = require('./routes/testRoutes');

app.use(express.json());
app.use('/api/test', testRoutes);

module.exports = app;

