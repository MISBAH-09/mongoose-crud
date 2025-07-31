const EnquiryModel = require("../../Models/enquirymodel");  // note capital 'E'

let enquiryInsert = (request, response) => {
  let { sName, sEmail, sPhone, sMessage } = request.body;

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
};

let enquiryList = async (request, response) => {
  let enquiryList = await EnquiryModel.find();
  response.status(200).json({ status: 1, message: "enquiry list", data: enquiryList });
};

let deleteEnquiry = async (request, response) => {
  let enquiryid = request.params.id;
  let delresponse = await EnquiryModel.deleteOne({ _id: enquiryid });
  response.status(200).json({ status: 1, message: "enquiry deleted", id: enquiryid, delRes: delresponse });
};

let updateenquiry = async (request, response) => {
  let enquiryid = request.params.id;
  let { sName, sEmail, sPhone, sMessage } = request.body;
  let updateobj = {
    name: sName,
    email: sEmail,
    phone: sPhone,
    message: sMessage
  };

  let updateenquiry = await EnquiryModel.updateOne({ _id: enquiryid }, updateobj);
  response.status(200).json({ status: 1, message: "enquiry updated", updateenquiry });
};

module.exports = { enquiryInsert, enquiryList, deleteEnquiry, updateenquiry };
