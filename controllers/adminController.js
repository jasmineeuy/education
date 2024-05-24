//import model
const Center = require("../model/centerModel");
//contains handler functions for adminRouter

const getCenter = async (request, response, next) => {
  try {
    await Center.find({}).then((centers) => {
      response.status(200).json({
        success: { message: "This is the admin page" },
        data: centers,
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
const createCenter = async (request, response, next) => {
  response.status(302).redirect("api/centers/add-facility");
};

const editCenter = async (request, response, next) => {
  const { id } = request.params;
  const { name, address, number, email, hours, approved } = request.body;
  try {
    await Center.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          address,
          number,
          email,
          hours,
          approved,
        },
      },
      { new: true }
    );

    response.status(201).json({
      success: { message: "Edit to center was successful" },
      statusCode: 201,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "An error occurred while updating" },
      statusCode: 400,
    });
  }
};

const deleteCenter = async (request, response, next) => {
  const { id } = request.params;

  try {
    await Center.findByIdAndDelete(id);
    response.status(200).json({
      success: { message: "Delete center was successful" },
      statusCode: 200,
    });
  } catch (error) {
    response.status(400).json({
      error: { message: "An error occurred while deleting" },
      statusCode: 400,
    });
  }
};
module.exports = {
  editCenter,
  deleteCenter,
  getCenter,
  createCenter,
};
