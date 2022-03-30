// /* eslint-disable no-console */
// require('dotenv').config();
// const mongoose = require('mongoose');

// process.on('uncaughtException', err => {
//   console.log('Unhandler Exception! Shutting Down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// mongoose
//   .connect(process.env.DATABASE_HOST + process.env.DATABASE_NAME)
//   .then(() => {
//     console.log(`${process.env.DATABASE_NAME} db connected successfully`);
//   })
//   .catch(err => {
//     console.log(err);
//     console.log('db error');
//     process.exit(1);
//   });

// const app = require('./app');

// const PORT = 3000 || process.env.PORT; 
// app.listen(PORT, () => {
//   console.log(`server started on ${PORT}`);
// });

//cai nay la cua tui setup 

const express = require('express');
const app = express();

const connectDB = require('./database/db');

connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));