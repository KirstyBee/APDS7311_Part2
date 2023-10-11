require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const hsts = require('./middleware/hsts');

// DB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Db connected.....'));

// MIDDLEWARE
app.use(cors({ origin: 'https://localhost:3000', optionsSuccessStatus: 200 }));
app.use(express.json());
app.use(hsts);

// ROUTERS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', '*');
  next();
});

module.exports = app;
