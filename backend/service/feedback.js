const { User, Feedback } = require("../models/models");

const feedback = {
    update: async (feedback) => {
        try {
            let mFeedback = await Feedback.findByPk(feedback.id);
            
            if(feedback.startingPoint && feedback.destinationPoint &&
            feedback.transportType && feedback.departureHour &&
            feedback.tripDuration !== 'undefined' &&
            feedback.crowdednessLevel && 
            feedback.observations && feedback.satisfactionLevel) {
                mFeedback.startingPoint = feedback.startingPoint;
                mFeedback.destinationPoint = feedback.destinationPoint;
                mFeedback.transportType = feedback.transportType;
                mFeedback.departureHour = feedback.departureHour;
                mFeedback.tripDuration = feedback.tripDuration;
                mFeedback.crowdednessLevel = feedback.crowdednessLevel;
                mFeedback.observations = feedback.observations;
                mFeedback.satisfactionLevel = feedback.satisfactionLevel;
                
                await mFeedback.save();
            } else {
                throw new Error('one or more of the fields are empty');
            }
            
            // let oldInstance = await User.findByPk(feedback.id);
            // await oldInstance.destroy();
            
            // return await Feedback.create(feedback);
        } catch(err) {
            throw new Error(err.message);
        }
    },
    create: async (feedback, id) => {
        try {
            
            const newFeedback = await Feedback.build(feedback);
            newFeedback.userId = id;
            await newFeedback.save();
            
            return newFeedback;
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
    },
    getByUserId: async (id) => {
        try {
            const user = await User.findByPk(id);
            const feedbacks = await user.getFeedbacks();
            
            return feedbacks;
        } catch(err) {
            throw new Error(err.message);
        }  
    },
    delete: async (feedbackId) => {
        try{
            const feedback = await Feedback.findByPk(feedbackId);
            console.log(feedback);
            const user = await User.findByPk(feedback.userId);
            
            await feedback.destroy();
            
            return true;
        } catch(err){
            throw new Error(err.message);
        }
    },
    
    filter: async (type,keyword) => {
        try{
            let feedback;
            
            switch (type) {
                case 'startingPoint':
                    feedback = await Feedback.findAll( {where: {'startingPoint': keyword} });
                    break;
                    
                case 'destinationPoint':
                    feedback = await Feedback.findAll( {where: {'destinationPoint': keyword} });
                    break;
                
                case 'transportType':
                    feedback = await Feedback.findAll( {where: {'transportType': keyword} });
                    break;
                
                default:
                    throw new Error("Unknown type queried!");
            }
            
            return feedback;
        } catch(err){
            throw new Error(err.message);
        }
    }
} 

module.exports = feedback;