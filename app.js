require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");
const express = require("express"); //importing express

//middleware
const morgan = require("morgan");
const path = require("node:path");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const helmet = require("helmet");

//import router path to access from app.js site and admin
const siteRoute = require("./routes/siteRouter");
const adminRoute = require("./routes/adminRouter");
const centersRoute = require("./routes/centersRouter");
const authRoute = require("./routes/authRouter");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan("combined"));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//routes for homepage and to connect to site and admin
//going to use app.use to detect request and then go to function
app.use("/", siteRoute);
app.use("/api/admin", adminRoute);
app.use("/api/centers", centersRoute);
app.use("/api/auth", authRoute);

// auth should have login , logout , signup only
// once logged in admin has access to create, delete update

// app.get("/", (request, response, next) => {
//   response
//     .status(200)
//     .json({ success: { message: "Home page is successful" }, statusCode: 200 });
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
