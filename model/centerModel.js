//use const to require mongoose
const mongoose = require("mongoose");

//setup schema
const { Schema } = mongoose;

const centerSchema = new Schema({
  name: {
    type: String,
    required: [true, "A name is required"],
    unique: true,
  },
  address: {
    type: String,
    required: [true, "An address is required"],
  },
  zipcode: {
    type: Number,
  },
  number: {
    type: Number,
  },
  email: {
    type: String,
  },
  hours: {
    type: String,
  },
  approved: {
    type: Boolean,
  },
});

const Center = mongoose.model("Center", centerSchema);

//export schema
module.exports = Center;
