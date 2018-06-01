import jwt      from "jsonwebtoken";
import User     from "../models/user_model";
import config   from "../config/config";

module.exports = (req,res,next) => {
        jwt.verify(req.headers['x-token'],config.jwt, (err,decoded) => {
            if(err) return res.json(err);

            User.findOne({"email":decoded.email})
                .then(user => {
                    if(user != null) {
                        req.currentUser = user;
                        next();
                    }else {
                        return res.json("error:UserNotFound");
                    }
                    
                })
                .catch(err => res.json(err))                
        })

};