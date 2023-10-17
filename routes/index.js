import express from 'express';
import { Verify, VerifyRole } from '../Middlewares/verify.js';
import Auth from './userRoute.js';

const app = express();

app.disable('x-powered-by'); //Reduce fingerprinting
app.get('/favico.ico', (req, res) => {
  res.sendStatus(404);
});
app.get('/', (req, res) => {
  try {
    res.set('Content-Security-Policy', "default-src 'self'");
    res.status(200).json({
      status: 'success',
      data: [],
      message: 'Welcome to our API homepage!',
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});
app.use('/auth', Auth);
app.get('/admin', Verify, VerifyRole, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the Admin portal!',
  });
});
export default app;