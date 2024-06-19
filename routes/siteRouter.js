//contains public routes static information
const express = require("express");
//import handler functions to access via router.Method from siteContrl
const {
  getHome,
  getAbout,
  getQuestions,
} = require("../controllers/siteController");

//import router
const router = express.Router();

//create routes for each different route
//route.method("path",handler function)

// home -get
router.get("/", getHome);

// about -get
router.get("/about", getAbout);

// questions -get
router.get("/questions", getQuestions);

//export routes
module.exports = router;
