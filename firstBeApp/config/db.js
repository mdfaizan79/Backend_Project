const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI; // MongoDB connection string

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

module.exports = mongoose;
