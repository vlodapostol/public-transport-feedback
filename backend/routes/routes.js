const express = require("express");
const router = express.Router();

const userController = require('./../controller/user');
const feedbackController = require('./../controller/feedback');

router.post("/user", userController.createUser);
router.get("/user/id", userController.getUserById);

router.post("/feedback", feedbackController.createFeedback);
router.get("/feedback", feedbackController.getAllFeedbacks);

module.exports = router;