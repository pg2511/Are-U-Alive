const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());

app.listen(5000, () => {
    console.log("Backend is at port 5000");

    mongoose.set("strictQuery", true);
    
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Established a connection with the database');
    }).catch(err => console.log('Error connecting to database', err));

});