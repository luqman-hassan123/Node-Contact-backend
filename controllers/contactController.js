const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose"); 
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create a new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is:", req.body);

  // Error handle if fields are empty
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Use the correct reference to the model
  const newContact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(newContact); // Send the response
});

//@desc Get contact by ID
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async(req, res) => {
  const singleContact = await Contact.findById(req.params.id);
  if (!singleContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(singleContact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  const updatedContact = await contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const deletedContact = await contact.findByIdAndDelete(req.params.id);
  if (!deletedContact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
