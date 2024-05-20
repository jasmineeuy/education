//contains public routes static information
const express = require("express");
//import handler functions to access via router.Method from siteContrl
const {
  getHome,
  getAbout,
  getQuestions,
  getLogin,
  getSignUp,
} = require("../controllers/siteController");
//import router
const router = express.Router();
//create routes for each different route
//route.method("path",handler function)
/*
Create - Post 
Read - Get
Update - Put
Delete - Delete
*/

// home -get
router.get("/", getHome);

// about -get
router.get("/about", getAbout);

// questions -get
router.get("/questions", getQuestions);

router.get("/login", getLogin);
router.get("/signUp", getSignUp);

//export routes
module.exports = router;
