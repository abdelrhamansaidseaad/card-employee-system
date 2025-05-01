require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const cardRoutes = require('./routes/cardRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// Routes
app.use('/api/cards', cardRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});