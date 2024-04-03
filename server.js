import 'express-async-errors'; //no manual try/catch!
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan'; //logs requests and their status to console
import mongoose from 'mongoose';
import cors from 'cors'; // allow cross-origin requests
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.100.22:3000', 'http://hatemyshit.com:3000', 'http://hatemyshit.com'],
  credentials: true,
};

//inits
const app = express();
app.use(cors(corsOptions));
//app.use(cors()); // allow cross-origin requests
dotenv.config();

// router file importing here
import testRouter from './routes/testRouter.js';
import groupRouter from './routes/groupRouter.js';
import transactionRouter from './routes/transactionsRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

//initing MORGAN to be used *only* in dev environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Cookies init
app.use(cookieParser());

//MW for accepting JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello fans, i am back on the backend');
});

//ROUTES
app.use('/wesplit/api/v1/test', testRouter);
app.use('/wesplit/api/v1/group', groupRouter);
app.use('/wesplit/api/v1/transactions', authenticateUser, transactionRouter);
app.use('/wesplit/api/v1/auth', authRouter);
app.use('/wesplit/api/v1/users', authenticateUser, userRouter);

// Not Found Middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

//Error Middleware (has to be the last one)
app.use(errorHandlerMiddleware);

//port fetch from env
const port = process.env.PORT || 5500;
// Flag to indicate MongoDB connection status
let mongoDBConnected = false;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}....`);
  // Attempt to connect to MongoDB
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      mongoDBConnected = true;
      console.log('MongoDB connected!');
    })
    .catch((error) => {
      console.error('Failed to connect to MongoDB:', error);
      // MongoDB connection error does not prevent the server from starting
    });
});

// Middleware to check MongoDB connection
app.use((req, res, next) => {
  if (!mongoDBConnected) {
    return res.status(503).send('Service Unavailable: MongoDB is down');
  }
  next();
});