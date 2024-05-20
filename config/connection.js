require("dotenv").config();
//require mongoose
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
main().catch((error) => console.log(error));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("Mongoose DB Connected");
}
