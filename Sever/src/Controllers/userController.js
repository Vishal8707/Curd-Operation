const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const {
  validateName,
  validateEmail,
  validatePassword,
  validateMobileNo,
} = require("../validation/validator");

const { isValidObjectId } = require("mongoose");

const createUsers = async function (req, res) {
  try {
    let data = req.body;

    data.userName = data.userName.toLowerCase().trim();
    data.emailId = data.emailId.toLowerCase().trim();
    data.password = data.password.trim();

    let { userName, emailId, password, mobileNumber } = data;

    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill out all the details." });

    if (!userName)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide a userName" });
    if (!emailId)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide an emailId" });
    if (!mobileNumber)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide a mobileNumber" });
    if (!password)
      return res
        .status(400)
        .send({ status: false, msg: "Please provide a password" });

    if (!validateName(userName))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  userName" });

    if (!validateEmail(emailId))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  emailId" });

    if (!validateMobileNo(mobileNumber))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  mobileNumber" });

    if (!validatePassword(password))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  password" });

    const checkData = await userModel.findOne({
      $or: [{ emailId: emailId }, { mobileNumber: mobileNumber }],
    });

    if (checkData)
      return res.status(400).send({
        status: false,
        msg: "This emailId and mobileNumber is already registered",
      });

    const saveData = await userModel.create(data);
    return res.status(201).send({
      status: true,
      mag: "user successfully register",
      data: saveData,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

const loginUser = async function (req, res) {
  try {
    let data = req.body;
    let { emailId, password } = data;

    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill all the details" });

    if (!emailId || emailId == "")
      return res
        .status(400)
        .send({ status: false, msg: "emailId is mandatory" });
    if (!password || password == "")
      return res
        .status(400)
        .send({ status: false, msg: "password is mandatory" });
    if (!validateEmail(emailId))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  emailId" });
    if (!validatePassword(password))
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid  password" });

    let verifyUser = await userModel.findOne({ emailId: emailId });

    if (!verifyUser)
      return res.status(400).send({ status: false, message: "user not found" });

    let token = jwt.sign({ userId: verifyUser["_id"] }, "very-very-secret-key");

    res.setHeader("x-api-key", token);

    return res.status(200).send({
      status: true,
      message: "User login successfull",
      data: { userId: verifyUser["_id"], token },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

const getUser = async function (req, res) {
  try {
    data = req.query;
    data.isDeleted = false;
    let getData = await userModel.find(data).sort("userName");

    if (getData && getData.length > 0) {
      return res.status(200).send({
        status: true,
        msg: "successfully get all users data",
        data: getData,
      });
    } else {
      return res.status(404).send({
        status: false,
        msg: "No users found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).send({
      status: false,
      msg: "Internal server error.",
      data: [],
    });
  }
};

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    let data = req.body;
    data.emailId = data.emailId.toLowerCase().trim();

    if (Object.keys(data).length === 0)
      return res
        .status(400)
        .send({ status: false, msg: "Please fill all the details" });

    let { emailId } = data;

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "User Id is invalid." });

    const checkData = await userModel.findOne({ emailId: emailId });

    if (checkData)
      return res.status(400).send({
        status: false,
        msg: `This emailId is already update`,
      });

    let checkUserId = await userModel.findOne({ _id: userId });
    if (!checkUserId)
      return res
        .status(404)
        .send({ status: false, message: "User Id not found." });

    let updateUserData = await userModel.findOneAndUpdate(
      { _id: userId },
      { emailId: emailId },
      { new: true }
    );
    return res.status(200).send({
      status: true,
      message: "emailId is updated",
      data: updateUserData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId;
    
    if (!isValidObjectId(userId)) {
      return res
        .status(404)
        .send({ status: false, message: "please provide valid userid" });
    }
    let checkUserId = await userModel.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      { isDeleted: true, deletedAt: Date.now() },
      { new: true }
    );
    if (!checkUserId) {
      return res
        .status(404)
        .send({ status: false, message: " User already deleted." });
    }
    return res
      .status(200)
      .send({ status: true, message: "User successsfully deleted." });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.msg });
  }
};

module.exports = { createUsers, loginUser, getUser, deleteUser, updateUser };
