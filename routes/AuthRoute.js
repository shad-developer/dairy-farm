const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const { protected, isAdmin } = require("../middleware/authMiddleware");

router.post("/signup", authController.Signup);
router.post("/verifyEmail", authController.verifyEmail);
router.post("/login", authController.Login);
router.post("/sendOTPForgotPassword", authController.sendOTPForgotPassword);
router.post("/resetPassword", authController.resetPassword);
router.post("/logout", authController.Logout);
router.get("/get-user", protected, authController.getUser);
router.get("/user/:id", protected, isAdmin, authController.getUserById);
router.delete("/user/:id", protected, isAdmin, authController.deleteUser);
router.put("/user/:id", protected, isAdmin, authController.updateUser);
router.get("/users", protected, isAdmin, authController.getAllUsers);


module.exports = router;
