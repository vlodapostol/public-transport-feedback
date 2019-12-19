const feedbackService = require("./../service/feedback")

const createFeedback = async (req, res, next) => {
    try {
        const result = await feedbackService.create(req.body, req.params.id);
        
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

const updateFeedback = async(req, res, next) => {
    try {
        console.log(req.body);
        await feedbackService.update(req.body);
        
        res.status(200).send('feedback updated successfully');
    } catch(err) {
        res.status(404).send(err.message);
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

const getFeedbacksByUserId = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const feedbacks = await feedbackService.getByUserId(userId);
        res.status(200).send(feedbacks);
    } catch(err){
        res.status(500).send({
            message: `Error: ${err.message}`
        })
    }
}

const deleteFeedback = async (req, res, next) => {
    try{
        const feedbackId = req.params.id;
        console.log(feedbackId);
        await feedbackService.delete(feedbackId);
        
        res.status(200).send('Click dreapta delete');
    } catch(err){
        res.status(500).send({
            message: `Error: ${err.message}`
        })
    }
}
    
const getFilteredFeedbacks = async (req, res, next) => {
    try {
        const type = req.params.type;
        const keyword = req.params.keyword;
        const feedbacks = await feedbackService.filter(type,keyword);
        
        res.status(200).json(feedbacks);
    } catch(err) {
        res.status(404).send(err.message);
    }
}


module.exports = { createFeedback, 
                    getAllFeedbacks, 
                    getFeedbacksByUserId, 
                    updateFeedback,
                    getFilteredFeedbacks,
                    deleteFeedback }