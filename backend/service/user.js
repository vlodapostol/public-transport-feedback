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
    authUser: async(user,pass) => {
      try {
          const result = await User.findOne({where: {
              username: user,
              password: pass
          }});
          
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
    },
    disable: async (id) => {
        try {
            let user = await User.findByPk(id);
            user.disable = true;
            await user.save();
            
            return user;
        } catch(err) {
            throw new Error(err.message);
        }
    },
    enable: async (id) => {
        try {
            let user = await User.findByPk(id);
            user.disable = false;
            await user.save();
            
            return user;
        } catch(err) {
            throw new Error(err.message);
        }
    },
    update: async (user) => {
        
        try{
        let mUser = await User.findByPk(user.id);
        
        if(user.email) {
            mUser.email = user.email;
            
            await mUser.save();
        }
        else{
            throw new Error('Email field is empty');
        }
        } catch(err){
            throw new Error(err.message);
        }
    }
}

module.exports = user;