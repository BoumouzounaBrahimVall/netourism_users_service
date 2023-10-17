import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { PORT, URI } from './config/index.js';
import App from './routes/index.js';

// === 1 - CREATE SERVER ===
const server = express();
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable('x-powered-by'); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// === 2 - CREATE DATABASE ===
// Set up mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.set('strictQuery', false);
console.log("URI:"+URI);
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('Connected to database'))
  .catch((err) => console.log("here we are : "+err));

// === 4 - CONFIGURE ROUTES ===
// Configure Route
server.use(App);

// === 5 - START UP SERVER ===
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);