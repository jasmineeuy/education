const express = require("express");
const passport = require("passport");

const {
  loginLocalFailed,
  logoutRequest,
  signupRequest,
} = require("../controllers/authController");

const {
  createCenter,
  editCenter,
  deleteCenter,
  getAdmin,
} = require("../controllers/adminController");
const router = express.Router();

//check if user is authenticated

const checkAuthentication = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  } else {
    response.redirect(403, "/unauthenticated");
  }
};

//admin authentication
router.get("/admin", checkAuthentication, (request, response, next) => {
  try {
    response.json("admin test");
    router.get("/auth", (request, response, next) => {
      response.json({ message: "authenticated" });
    });
    router.put("/update/:id", editCenter);
    router.delete("/delete/:id", deleteCenter);
  } catch (error) {
    console.log(error);
  }
});

//test to see if route function for authentication
// router.get("/admin/auth", (request, response, next) => {
//   response.json("Authenticated");
// });

router.get("/unauthenticated", (request, response, next) => {
  response.redirect("/"); // user not authenticated goes to homepage
});
router.get("/login/local/failed", loginLocalFailed);
// login - post - auth routes
//login local need to verify login with wrong password
router.post(
  "/login/local",
  passport.authenticate("local", {
    failureRedirect: "/login/local/failed",
  }),
  (request, response, next) => {
    response.status(200).json({
      success: { message: "User logged in" },
      data: {
        username: request.user.username,
        firstName: request.user.firstName,
        lastName: request.user.lastName,
      },
      statusCode: 200,
    });
  }
);

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
