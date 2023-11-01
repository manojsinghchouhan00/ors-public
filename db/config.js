const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/rays')
  .then(() => console.log('Config Connected!'));

// const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables from .env file

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;
// const hostname = process.env.DB_HOSTNAME;
// const port = process.env.DB_PORT;
// const databaseName = process.env.DB_NAME;

// // Construct the MongoDB connection URI
// const connection_string = `mongodb+srv://${username}:${password}@${hostname}:${port}/${databaseName}`;

// mongoose.connect(connection_string, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('MongoDB connection established.');
//   })
//   .catch((error) => {
//     console.error("MongoDB connection failed:", error.message);
//   });


// const mongoose = require('mongoose');
// mongoose.connect(connection_string)
//   .then(() => console.log('Config Connected!')).then((err)=>console.log('Config Connected!',err));

//   mongodb+srv://manojsinghchouhan00:<password>@cluster0.it1ht41.mongodb.net/?retryWrites=true&w=majority
//   mongodb+srv://manojsinghchouhan00:Welcome@123@cluster0.it1ht41.mongodb.net/?retryWrites=true&w=majority
//   mongodb://localhost:27017    Manoj's Org - 2023-09-02