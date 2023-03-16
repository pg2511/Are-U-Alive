const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require("axios");

const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./app/User/UserRoute');
const webRoutes = require('./app/Website/WebsiteRoutes');
const WebsiteSchema = require("./app/Website/WebsiteSchema");

const app = express();

app.use(cors());
app.use(express.json());

app.use(userRoutes);
app.use(webRoutes);

const isSiteActive = async (url) => {
    if (!url) return false;
  
    const res = await axios.get(url).catch((err) => void err);
  
    if (!res || res.status !== 200) return false;
  
    return true;
};

cron.schedule("0 */1 * * *", async () => {
    const allWebsites = await WebsiteSchema.find({}).populate({
      path: "userId",
      select: ["name", "email"],
    });
    if (!allWebsites.length) return;
  
    for (let i = 0; i < allWebsites.length; ++i) {
      const website = allWebsites[i];
      const url = website.url;
  
      const isActive = await isSiteActive(url);
      WebsiteSchema.updateOne(
        { _id: website._id },
        {
          isActive,
        }
      ).exec();
  
      if(!isActive){
        // send email to the user
      }
    }
});

app.listen(5000, () => {
    console.log("Backend is at port 5000");

    mongoose.set("strictQuery", true);
    
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Established a connection with the database');
    }).catch(err => console.log('Error connecting to database', err));

});