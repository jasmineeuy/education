//contains handler functions for siteRouter
// home -get
const getHome = async (request, response, next) => {
  try {
    await response
      .status(200)
      .json({ success: { message: "This is the home page" }, statusCode: 200 });
  } catch (error) {
    response.status(400).json({
      error: { message: "There was an error reaching the home" },
      statusCode: 400,
    });
  }
};

// about -get
const getAbout = async (request, response, next) => {
  try {
    await response.status(200).json({
      success: { message: "This is the about page" },
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Unable to reach the about page" },
      statusCode: 400,
    });
  }
};

// questions -get
const getQuestions = async (request, response, next) => {
  try {
    await response.status(200).json({
      success: { message: "This is the questions page" },
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Unable to reach the questions" },
      statusCode: 400,
    });
  }
};

const getLogin = async (request, response, next) => {
  try {
    await response.status(200).json({
      success: { message: "This is the login page" },
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Cannot get login page" },
      statusCode: 400,
    });
  }
};

const getSignUp = async (request, response, next) => {
  try {
    await response.status(400).json({
      success: { message: "This is the signup page" },
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "Cannot get the sign up page" },
      statusCode: 400,
    });
  }
};

const getSearch =async(request,response,next)=>{
  try{
    await response.status(400).json({
      success:{message:"This is the search page"}
    })
  }catch(error){}
}

module.exports = { getHome, getAbout, getQuestions,getLogin, getSignUp };
