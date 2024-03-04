/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import cors from 'cors';
import router from './router';

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000', // Listen to requests from the Next.js App
  optionsSuccessStatus: 200
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use('/api', router);

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

server.on('error', console.error);
