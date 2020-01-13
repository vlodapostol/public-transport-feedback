const express = require("express");
const router = express.Router();

const userController = require('./../controller/user');
const feedbackController = require('./../controller/feedback');

router.post("/register", userController.createUser);
router.post("/login", userController.authUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id/update", userController.modifyUser);
router.put("/user/:id/enable", userController.enableUser);
router.put("/user/:id/disable", userController.disableUser);
router.post("/resetpassword", userController.resetPassword)

router.get("/feedback/getall", feedbackController.getAllFeedbacks);
router.post("/user/:username/feedback", feedbackController.createFeedback);
router.get("/user/:username/feedback", feedbackController.getFeedbacksByUsername);
router.delete("/feedback/delete", feedbackController.deleteFeedback);
router.put('/feedback/update', feedbackController.updateFeedback);
router.get("/feedback/search/:type/:keyword", feedbackController.getFilteredFeedbacks);

module.exports = router;
