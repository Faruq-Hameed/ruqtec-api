const joi = require('joi')

function validatedUserJoiSchema(data) {
  const userSchema = joi.object({
    firstName: joi.string().max(255).required(),
    lastName: joi.string().max(255).required(),
    email: joi.string().max(255).email().required(),
    phoneNumber: joi.string().max(255).required(),
    course: joi.string().max(255).required(),
    whyThisCourse: joi.string().required(),
  });
  return userSchema.validate(data);
}


module.exports = {validatedUserJoiSchema}
