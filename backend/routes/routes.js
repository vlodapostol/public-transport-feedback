const express = require("express");
const router = express.Router();

const userController = require('./../controller/user');
const feedbackController = require('./../controller/feedback');

router.post("/user", userController.createUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id/update", userController.modifyUser);
router.put("/user/:id/enable", userController.enableUser);
router.put("/user/:id/disable", userController.disableUser);

router.post("/user/:id/feedback", feedbackController.createFeedback);
router.get("/user/:id/feedback", feedbackController.getFeedbacksByUserId);
router.delete("/feedback/:id/delete", feedbackController.deleteFeedback);
router.put('/feedback/:id/update', feedbackController.updateFeedback);
router.get("/feedback/search/:type/:keyword",feedbackController.getFilteredFeedbacks);

module.exports = router;