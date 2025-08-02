const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');



const app = express();


app.use(cors());
app.use(express.json());


app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} accessed`);
  next();
});


app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(4000, () => console.log(' Server running on port 4000'));
  })
  .catch(err => console.log(' MongoDB connection error:', err));
