const express = require('express');
const mongoose = require('mongoose');
const { enquiryInsert, enquiryList, deleteEnquiry, updateenquiry } = require('./App/Controllers/web/userEnquiryController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post("/api/enquiry-insert",enquiryInsert );
app.get("/api/enquiry-list",enquiryList);
app.delete("/api/enquiry-delete/:id",deleteEnquiry);
app.put("/api/enquiry-update/:id",updateenquiry);

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
