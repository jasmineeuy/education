// use const to require mongoose
const mongoose = require("mongoose");

//create schema

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String, required: [true, "A first name is required"] },
  lastName: { type: String, required: [true, "A last name is required"] },
  email: { type: String },
  phoneNumber: { type: Number },
  username: {
    type: String,
    required: [true, "A username is required"],
    unique: true,
  },
  password: { type: String, required: [true, "A password is required"] },
  googleId: { type: String },
});

//export model for use

const User = mongoose.model("User", userSchema);
module.exports = User;
