// contains handler functions for auth routes
//require bcrypt and user model

const bcrypt = require("bcrypt");
const User = require("../model/userModel");

const loginLocalFailed = (request, response, next) => {
  response.status(401).json({
    error: { message: "Username or password is incorrect" },
    statusCode: 401,
  });
};

//signup handler function using bcrypt to hash password
const logoutRequest = (request, response, next) => {
  request.logout((error) => {
    if (error) {
      response
        .status(400)
        .json({ error: { message: "Something went wrong" }, statusCode: 400 });
    }
    response
      .status(200)
      .json({ success: { message: "User logged out" }, statusCode: 200 });
  });
};

const signupRequest = (request, response, next) => {
  const { firstName, lastName, email, phoneNumber, username, password } =
    request.body;
  bcrypt.hash(password, 10, async (error, hashedPassword) => {
    if (error) {
      return next(error);
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password: hashedPassword,
      googleId: "",
    });
    try {
      await newUser.save();
      request.login(newUser, (error) => {
        if (error) {
          response.status(400).json({
            error: { message: "Something went wrong when creating an account" },
            statusCode: 400,
          });
        }
      });
      response.status(201).json({
        success: { message: "New user is created" },
        data: { firstName, lastName, username },
        statusCode: 201,
      });
    } catch (error) {
      //use if statement to see if empy space and or username already exists
      if (error.code === 11000 && error.keyPattern.username) {
        response.status(400).json({
          error: { message: "Username already exists" },
          statusCode: 400,
        });
      } else {
        response.status(500).json({
          error: { message: "Internal Server Error" },
          statusCode: 500,
        });
      }
    }
  });
};

//export functions
module.exports = { loginLocalFailed, logoutRequest, signupRequest };
