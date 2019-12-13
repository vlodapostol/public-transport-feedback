const feedbackService = require("./../service/feedback")

const createFeedback = async (req, res, next) => {
    try {
        const result = await feedbackService.create(req.body);
        
        res.status(201).json({
            message: "Feedback added succesfully"
        });
    } catch(err) {
        res.status(400).send({
            message: "Invalid feedback paylod",
            err: err.message
        });
    }
}

const getAllFeedbacks = async (req, res, next) => {
    try{
        const feedbacks = await feedbackService.getAll();
        res.status(200).send(feedbacks);
    } catch(err){
        res.status(500).send({
            message: `Error: ${err.message}`
        });
    }
}

module.exports = { createFeedback, getAllFeedbacks };