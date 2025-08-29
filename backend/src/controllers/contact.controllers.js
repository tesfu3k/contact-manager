import { contacts, updateContacts } from "../data/contacts.js";
import { generateId } from "../utils/id.js";
import contactModel from "../models/contact.model.js";

const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModel.find();
    res
      .status(200)
      .json({ message: "all contact", success: true, data: { contacts } });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const getContact = async (req, res) => {
  try {
    const id = req.params.contactId;
    if (!id)
      return res.status(400).json({
        message: "invalid id params recived",
        success: true,
        data: null,
      });
    //const contact =contactModel.find({_id:id}) [{...}]
    const contact = await contactModel.findById(id); // {...}

    if (!contact)
      return res
        .status(404)
        .json({ message: "contact not found", success: false, data: null });

    res.status(200).json({ data: { contact }, message: null, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    if (!firstName || !email || !phone) {
      return res
        .status(400)
        .json({ message: "invalid data", success: false, data: null });
    }
    const contact = await contactModel.create({
      firstName,
      lastName,
      email,
      phone,
    });

    res.status(201).json({
      data: { contact },
      success: true,
      message: "data created successfuly",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message, success: false, data: null });
  }
};

const updateContact = async (req, res) => {
  try {
    // grap data
    const id = req.params.contactId;
    const { firstName, lastName, email, phone } = req.body;

    // validate the data
    if (!id)
      return res
        .status(400)
        .json({ message: "invalid contact ID", success: false, data: null });

    if (!firstName && !lastName && !email && !phone)
      return res.status(400).json({
        message: "At list one data is reqired ",
        success: false,
        data: null,
      });
    // update the target contact data
    const updatedObj = {};
    if (firstName) updatedObj.firstName = firstName;
    if (lastName) updatedObj.lastName = lastName;
    if (email) updatedObj.email = email;
    if (phone) updatedObj.phone = phone;
    // TODO first check if the id is exist
    const contact = await contactModel.updateOne({ _id: id }, updatedObj);

    res.status(200).json({
      message: "the contact has been updated successfully",
      data: { contact },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: true, data: null });
  }
};

const deletedContact = async (req, res) => {
  try {
    const id = req.params.contactId;
    if (!id)
      res
        .status(400)
        .json({ message: "valid is required", success: false, data: null });

    const deletedContact = await contactModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "contact has been deleted successfully ",
      success: false,
      data: { deletedContact },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: true, data: null });
  }
};

export {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deletedContact,
};
