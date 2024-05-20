//contains routes for admin
const express = require("express");
//import handler functions from adminContrl
const {
  editCenter,
  deleteCenter,
  getAdmin,
  createCenter,
} = require("../controllers/adminController");
//import router

const router = express.Router();

//create routes for each different route
//router.method("path",handler Function)

/*
Create - Post 
Read - Get
Update - Put
Delete - Delete
*/

//routes start with /admin route
router.get("/", getAdmin);
//router.get("/create", createCenter);
//get approved centers
// /update/:id - put - update information for a specific tutoring
router.put("/update/:id", editCenter);
// /delete/:id - delete - delete a specific tutoring
router.delete("/delete/:id", deleteCenter);
//export router
module.exports = router;
