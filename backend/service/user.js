const { User } = require("../models/models");

const user = {
    create: async (user) => {
        try {
            const result  = await User.create(user);
            
            return result;
        } catch(err) {
            throw new Error(err.message);
        }
    },
    getById: async (id) => {
        try {
            const result = await User.findByPk(id);
            
            return result;
        } catch(err) {
            throw new Error(err.message);
        } 
    }
}

module.exports = user;