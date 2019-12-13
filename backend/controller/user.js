const userService = require('../controller/user');

const createUser = async(request, response, next) => {
    const user = request.body;
    if(user.id && user.username && user.email && user.password) {
        const result = await userService.create(user);
        response.status(201).send({
            message:'User added successfully'
        });
    } else {
        response.status(400).send({
            message:'Invalid user payload.'
        });
    }
}

const getUserById = async(request, response, next) => {
    try{
        const id = request.body.id;
        if(id) {
            try{
                const user = await userService.getById(id);
                response.status(200).send(user);
            } catch(err) {
                response.status(500).send({
                    message:'Error occured'+err.message
                });
        }
            } else {
                response.status(400).send({
                    message: 'No id specified'
                })
            }
       } catch(err) {
          response.status(500).send({
             message:'Error occured'+err.message
                })
            }
        }
        
    module.exports = {
        createUser,
        getUserById
    }