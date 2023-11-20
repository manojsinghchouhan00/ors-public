const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/rays')
//   .then(() => console.log('Config Connected!'));


const dotenv = require('dotenv');
dotenv.config();

// Log the value of process.env.MONGO_URL
// console.log('MONGO_URL:', process.env.MONGO_URL);


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected!1111'))
  .catch(err => console.error('Error connecting to MongoDB:', err.message));

