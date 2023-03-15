const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./app/User/UserRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);

app.listen(5000, () => {
    console.log("Backend is at port 5000");

    mongoose.set("strictQuery", true);
    
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Established a connection with the database');
    }).catch(err => console.log('Error connecting to database', err));

});