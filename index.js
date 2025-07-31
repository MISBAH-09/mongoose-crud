const express = require('express');
const mongoose = require('mongoose');
const EnquiryModel = require('./Models/enquirymodel');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post("/api/enquiry-insert", (request, response) => {
  let { sName, sEmail, sPhone, sMessage } = request.body;

  // Validate required fields before attempting to save
  if (!sName || !sEmail || !sPhone || !sMessage) {
    return response.status(400).send("Missing required fields");
  }

  let enquiry = new EnquiryModel({
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage
  });

  enquiry.save()
    .then(() => {
      response.send("Data saved");
    })
    .catch((err) => {
      console.error("Error saving enquiry:", err);
      response.status(500).send("Failed to save: " + err.message);
    });
});

app.get("/api/enquiry-list",async(request,response)=>{
    let enquiryList=await EnquiryModel.find();
    response.status(200).json({status:1,message:"enquiey list",data:enquiryList});
})

// Hardcoded port 8000
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
