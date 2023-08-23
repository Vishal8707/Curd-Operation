const express = require("express");
const {
  createUsers,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
} = require("../Controllers/userController");

const { isAuthenticated, authorization } = require("../middleware/Auth");
const router = express.Router();

router.get("/test-me", function (req, res) {
  res.send({ test: "Test-API" });
});

router.post("/register", createUsers);
router.post("/login", loginUser);
router.get("/allUser",isAuthenticated,getUser);
router.put('/updateData/:userId',isAuthenticated,authorization, updateUser)
router.delete("/delete/:userId",isAuthenticated,authorization, deleteUser);

router.all("/*", function (req, res) {
  res.status(404).send({ status: false, msg: "Invalid HTTP request" });
});

module.exports = router;
