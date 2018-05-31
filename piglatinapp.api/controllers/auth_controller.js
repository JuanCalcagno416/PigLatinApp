import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';
import config from '../config/config';

module.exports = {
    
    access: () => {
        User.findOne({$or:[{"email":req.body.email},{"username":req.body.username}]})
            .then(user => {
                if(user != null){
                    if(user.email == req.body.email || user.username == req.body.username) {
                        console.log('logeando')
                    } else {
                        console.log("No es el correo o el username")
                    }
                    
                } else {
                    return res.json({"Error":"InvalidCredentials"})
                }
            })
    }
}
