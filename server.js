const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/db');

// declare routes
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');
const ErrorHandler = require('./utils/ErrorHandler');
const order = require('./routes/order');

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);
app.use('/api/order', order);

app.use(ErrorHandler);


// Connect Db
connectDB();

// Connect Port
const port = process.env.PORT || 7000;

app.listen(port, () => console.log(`Listening on port ${port}`));
