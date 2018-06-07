import jwt from 'jsonwebtoken';
import User from '../models/user_model.js';
import config from '../config/config';

module.exports = {
    
    access: (req,res) => {
        console.log(req.body)
        User.findOne({$or:[{"email":req.body.email},{"username":req.body.username}]})
            .then(user => {
                if(user != null){
                    if(user.email == req.body.email || user.username == req.body.username) {
                        User.comparePassword(req.body.password,user.password,(err,isMatch) => {
                            if(err) return res.json(err);
                            if(isMatch){
                                let payload = {
                                    email:user.email,
                                    first_name:user.first_name
                                }

                                let token = jwt.sign(payload,config.jwt)
                                
                                return res.json({
                                    "result":"Success",
                                    "token":token
                                })
                            }else {
                                return res.json({"error":"InvalidCredentials"})
                            }
                        })
                    } else {
                        return res.json("No es el correo o el username")
                    }
                    
                } else {
                    return res.json({"Error":"InvalidCredentials"})
                }
            })
    }
}
