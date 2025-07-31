const express = require('express');
const mongoose = require('mongoose');
const { enquiryroutes } = require('./App/Routes/web/Enquiryroutes');


require('dotenv').config();

const app = express();
app.use(express.json());

app.use("/web/api/enquiry",enquiryroutes)

const port = 8000;
mongoose.connect(process.env.DBUrl)
  .then(() => {
    console.log("Database has been connected");
    app.listen(port, () => {
      console.log("Process is running on port: " + port);
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });
