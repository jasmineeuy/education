const express = require("express");
//import handler functions from adminContrl
const {
  getCenters,
  createFacility,
  getCenterById,
} = require("../controllers/centerController");
//import router

const router = express.Router();

//create routes for each different route
//router.method("path",handler Function)

// / - get
router.get("/", getCenters);
// add-facility -post
router.post("/add-facility", createFacility);

// search/:zipcode - put
router.get("/search/:zipcode", getCenterById);

module.exports = router;
