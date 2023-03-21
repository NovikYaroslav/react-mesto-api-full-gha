const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { PORT } = require('./utils/const');
const router = require('./routers');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});

const app = express();

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT);
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
// test