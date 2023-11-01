const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const newsLetterSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email required to sign up for newsletter"],
    },
  },
  { timestamps: true }
);

module.exports = model("Email_List", newsLetterSchema);
