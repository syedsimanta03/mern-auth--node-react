const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('dotenv').config();

// Start express app
const app = express();

// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI
mongoose.connect(mongoDB, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('open', () => console.info('Database connected!✨'));
db.on('error', console.error.bind(console, 'MongoDB connection error:😢'));

// import routes
const authRoutes = require('./routes/auth');

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// cors setup
if (process.env.NODE_ENV = 'development') {
  app.use(cors('*'));
} 
// middleware
app.use('/api', authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`API is running on port ${port}`);
});
