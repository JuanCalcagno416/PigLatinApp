import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';
import config from '../config/config';

module.exports = {
    
    access: () => {
        User.findOne({$or:[{"email":req.body.email},{"username":req.body.username}]})
            .then(user => {
                if(user != null){

                } else {
                    return res.json({"Error":"InvalidCredentials"})
                }
            })
    }
}