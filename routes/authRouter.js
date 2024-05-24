const express = require("express");
const passport = require("passport");

const {
  loginLocalFailed,
  logoutRequest,
  signupRequest,
} = require("../controllers/authController");

const router = express.Router();

//check if user is authenticated

router.get("/unauthenticated", (request, response, next) => {
  response.redirect("/"); // user not authenticated goes to homepage
});

//login local need to verify login with wrong password
router.post("/login/local", (request, response, next) => {
  passport.authenticate("local", (error, user, info) => {
    //goes to auth strategy and completes function to bring user info  or error
    if (error) {
      return response.status(400).json({
        error: { message: "There was an error when logging in" },
        statusCode: 400,
      });
    }
    if (!user) {
      //returns no user found if not found but use message to not give what is not working
      return response
        .status(401)
        .json({
          error: { message: "Username or password incorrect" },
          statusCode: 401,
        });
    }
    request.login(user, (error) => {
      //if auth strategy works
      if (error) {
        //problem when trying to login with user
        return response
          .status(400)
          .json({
            error: { message: "There was a problem logging in" },
            statusCode: 400,
          });
      }
      response.status(200).json({
        success: { message: "User logged in" },
        data: {
          username: request.user.username,
          firstName: request.user.firstName,
          lastName: request.user.lastName,
        },
        statusCode: 200,
      });
    });
  })(request, response, next);
});
router.get("/login/local/failed", loginLocalFailed);
// login - post - auth routes

router.get("/logout", logoutRequest);
// signup - post  -auth
router.post("/signup", signupRequest);

//google route
//use passport google authentication strategy to see login via account
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get("/login/google/failed", (request, response, next) => {
  response.json({ message: "There was an error getting account" });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login/google/failed",
  })
);

module.exports = router;
