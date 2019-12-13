const { Feedback } = require("../models/models");

const feedback = {
    create: async (feedback) => {
        try {
            console.log(feedback);
            const result = await Feedback.create(feedback);
            
            return result;
        } catch(err) {
            throw new Error(err.message);
        }
    },
    getAll: async () => {
        try {
            const feedbacks = await Feedback.findAll();
            
            return feedbacks;
        } catch(err) {
            throw new Error(err.message);
        }
    }
}

module.exports = feedback;