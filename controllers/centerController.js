//import model
const Center = require("../model/centerModel");
//get all facility info

const getCenters = async (request, response, next) => {
  try {
    await Center.find({}).then((centers) =>
      response.status(200).json({
        success: { message: "Found all the centers" },
        data: centers,
        statusCode: 200,
      })
    );
  } catch (error) {
    response.status(400).json({
      error: { message: "There was an issue trying to get all centers" },
      statusCode: 400,
    });
  }
};

//add facitlity handler function
const createFacility = async (request, response, next) => {
  const { name, address, zipcode, number, email, hours, approved } =
    request.body;
  const facility = new Center({
    name,
    address,
    zipcode,
    number,
    email,
    hours,
    approved,
  });
  try {
    await facility.save();
    response.status(201).json({
      success: { message: "facility created" },
      data: facility,
      statusCode: 201,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "There was an issue creating a new center" },
      statusCode: 400,
    });
  }
};

//display search results based on zipcode
const getCenterById = async (request, response, next) => {
  const { zipcode } = request.params;
  console.log("this is the", zipcode);
  try {
    await Center.find({ zipcode: zipcode }).then((foundCenter) => {
      console.log("foundCenter", foundCenter);
      response.status(200).json({
        success: { message: "The center was able to be retrieved by zipcode" },
        data: foundCenter,
        statusCode: 200,
      });
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "There was an error retrieving the center" },
      statusCode: 400,
    });
  }
};
//export handler functions
module.exports = { getCenters, createFacility, getCenterById };
