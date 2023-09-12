const mongoose = require("mongoose");

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
    age: {
      type: Number,
      required: [true, "cannot accept registration without age"],
    },
    gender: {
      type: String,
      required: [true, "cannot accept registration without gender"],
      enum: ["male", "female"],
    },
    studentOrCorper: {
      type: Boolean,
      required: [true, "cannot accept registration without filling all fields"],
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
    address: {
      type: String,
      required: [true, "cannot accept registration without address"],
    },
    course: {
      type: String,
      required: [true, "cannot accept registration without course"],
      enum: ["frontend", "backend", "data-science", "product-design"],
    },
    whyThisCourse: {
      type: String,
      required: [true, "cannot accept registration without reason"],
    },
    couponCode: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
