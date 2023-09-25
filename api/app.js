const express = require('express');
const app = express();
const cors = require('cors');
require('express-async-errors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const logger = require('./utils/logger');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.URI)
  .then(() => {
    logger.info('Connected to mongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.use('/api/auth', authRoute);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;