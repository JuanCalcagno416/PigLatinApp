import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';
import config from '../config/config';

module.exports = {
    
    access: (req,res) => {
        console.log(req.body)
        User.findOne({$or:[{"email":req.body.email},{"username":req.body.username}]})
            .then(user => {
                console.log(user)
                if(user != null){
                    if(user.email == req.body.email || user.username == req.body.username) {
                        return res.json('logeando')
                    } else {
                        return res.json("No es el correo o el username")
                    }
                    
                } else {
                    return res.json({"Error":"InvalidCredentials"})
                }
            })
    }
}
