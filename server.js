require('dotenv').config();
const path = require('path');
const express = require('express');
const connectDB = require('./mongoDB');
const userRoutes = require('./Routes/userRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const cors=require("cors")

const app = express();
app.use(express.json());
app.use(cors())
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});