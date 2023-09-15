// const joi = require("joi");

// function validatedUserJoiSchema(data) {
//   const userSchema = joi.object({
//     firstName: joi.string().required(),
//     lastName: joi.string().max(255).required(),
//     email: joi.string().max(255).email().required(),
//     age: joi.number(),
//     gender: joi.string().valid("male", "female").required(),
//     phoneNumber: joi.string().max(255).required(),
//     address: joi.string().max(255).required(),
//     course: joi.string().max(255).required(),
//     whyThisCourse: joi.string().required(),
//     couponCode: joi.string().max(255),
//     studentOrCorper: joi.boolean().required()
//   });
//   return userSchema.validate(data);
// }

// module.exports = { validatedUserJoiSchema };

const joi = require('joi');

function validatedUserJoiSchema(data) {
  const userSchema = joi.object({
    firstName: joi.string().required().messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name cannot be empty',
      'string.max': 'First name should have a maximum of {#limit} characters',
      'any.required': 'First name is required',
    }),
    lastName: joi.string().required().messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name cannot be empty',
      'string.max': 'Last name should have a maximum of {#limit} characters',
      'any.required': 'Last name is required',
    }),
    age: joi.number().required().messages({
      'number.base': 'Age must be a number',
      'number.empty': 'Age cannot be empty',
      'any.required': 'Age is required',
    }),
    gender: joi.string().valid('male', 'female').required().messages({
      'string.base': 'Gender must be a string',
      'string.empty': 'Gender cannot be empty',
      'any.only': 'Gender must be either "male" or "female"',
      'any.required': 'Gender is required',
    }),
    studentOrCorper: joi.boolean().required().messages({
      'boolean.base': 'Student/Corper must be a boolean',
      'any.required': 'Student/Corper field is required',
    }),
    email: joi.string().email().lowercase().required().messages({
      'string.base': 'Email must be a string',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
    }),
    phoneNumber: joi.string().required().messages({
      'string.base': 'Phone number must be a string',
      'string.empty': 'Phone number cannot be empty',
      'string.max': 'Phone number should have a maximum of {#limit} characters',
      'any.required': 'Phone number is required',
    }),
    address: joi.string().required().messages({
      'string.base': 'Address must be a string',
      'string.empty': 'Address cannot be empty',
      'string.max': 'Address should have a maximum of {#limit} characters',
      'any.required': 'Address is required',
    }),
    course: joi.string().valid('frontend', 'backend', 'data-science').required().messages({
      'string.base': 'Course must be a string',
      'string.empty': 'Course cannot be empty',
      'any.only': 'Invalid course type',
      'any.required': 'Course is required',
    }),
    whyThisCourse: joi.string().required().messages({
      'string.base': 'Reason must be a string',
      'string.empty': 'Reason cannot be empty',
      'any.required': 'Reason is required',
    })
    // ,
    // couponCode: joi.string().default('N/A'),
  });

  return userSchema.validate(data);
}

module.exports = { validatedUserJoiSchema };
