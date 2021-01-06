const mongoose = require("mongoose");
const Joi = require("joi");


const customerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  
    isVIP: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },

    bonusPoint: {
      type: Number,
      default: 0
    }
  });
  
  const Customer = mongoose.model("Customer", customerSchema);

  // Validate the request
function validateCustomer(customer) {
    const customerSchema = {
      name: Joi.string().required().min(4).max(25),
      isVIP: Joi.boolean().required(),
      phone: Joi.string().required().min(4).max(25),
    };
  
    return Joi.validate(customer, customerSchema);
  }

  exports.Customer = Customer;
  exports.validate = validateCustomer;
  exports.customerSchema = customerSchema;