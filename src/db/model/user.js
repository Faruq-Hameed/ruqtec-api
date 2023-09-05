const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "cannot accept registration without first name"],
    },
    lastName: {
      type: String,
      required: [true, "cannot accept registration without last name"],
    },
    email: {
      type: String,
      required: [true, "cannot accept registration without email"],
      unique: true,
    },

    phoneNumber: {
        type: String,
        required: [true, "cannot accept registration without phone number"],
      },
    course: {
      type: String,
      required: [true, "cannot accept registration without course"],
      enum: ["frontend", "backend", "data-science"],
    },
    whyThisCourse: {
        type: String,
        required: [true, "cannot accept registration without reason"],
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
