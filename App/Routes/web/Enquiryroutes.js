let express=require('express');
const { enquiryInsert, enquiryList, deleteEnquiry, updateenquiry } = require('../../Controllers/web/userEnquiryController');
let enquiryroutes=express.Router();

enquiryroutes.post("/enquiry-insert",enquiryInsert );
enquiryroutes.get("/enquiry-list",enquiryList);
enquiryroutes.delete("/enquiry-delete/:id",deleteEnquiry);
enquiryroutes.put("/enquiry-update/:id",updateenquiry);


module.exports={enquiryroutes};
