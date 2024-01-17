import 'express-async-errors'; //no manual try/catch!
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan'; //logs requests and their status to console
import mongoose from 'mongoose';

//inits
const app = express();
dotenv.config();

// router file importing here
import testRouter from './routes/testRouter.js';
import groupRouter from './routes/groupRouter.js';
import transactionRouter from './routes/transactionsRouter.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

//initing MORGAN to be used *only* in dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//MW for accepting JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello fans, i am back on the backend');
});

//ROUTES
//app.use('/api/v1/jobs', jobRouter);
app.use('/wesplit/api/v1/test', testRouter);
app.use('/wesplit/api/v1/group', groupRouter);
app.use('/wesplit/api/v1/transactions', transactionRouter);

// Not Found Middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

//Error Middleware (has to be the last one)
app.use(errorHandlerMiddleware);

//port fetch from env
const port = process.env.PORT || 5500;

// Server runs only when Mongo Connection okay
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
    //console.log(process.env.MONGO_URL);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
