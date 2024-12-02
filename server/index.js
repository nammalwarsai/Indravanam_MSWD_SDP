const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Initialize the app
const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Routes
// Define your routes after initializing the app
// Uncomment the following line if you have defined routes (replace 'exampleRoute' with your actual route)
// const exampleRoute = require('./routes/exampleRoute');
// app.use('/api', exampleRoute); // Base route for API

// Sample route
app.get('/', (req, res) => {
  res.send('Hello in the local development environment!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
