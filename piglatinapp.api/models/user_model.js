import mongoose     from 'mongoose'
import bcrypt       from 'bcrypt'
import validator    from 'validator'

const UserSchema = new mongoose.Schema({
    first_name:             {type:String},
    last_name:              {type:String},
    username:               {type:String},
    email:                  {type:String,validate:[validator.isEmail,'InvalidEmail']},          
    email_token:            {type:String},
    email_token_expires:    Date,
    password:               {type:String},
    created_at: {
    type: Date,
    default: Date.now
  }

})


UserSchema.pre('save',function (next) {
    let user = this;
    User.hashPassword(user.password,(err,newPassword) => {
            user.password = newPassword;
            next()
    });
})


UserSchema.statics = {
  
    hashPassword: (password,cb) => {
        bcrypt.genSalt(11, (err,salt) => {
            if(err) cb(err);
            bcrypt.hash(password,salt, (err,hashedPassword) =>{
                if(err) cb(err);
                cb(null,hashedPassword);
            })
        })
    },

    comparePassword(toVerifyPassword,password,cb) {

        bcrypt.compare(toVerifyPassword,password, function (err,isMatch) {
            if(err) return cb(err);
            return cb(null,isMatch);
        });

    },
}


let User = mongoose.model('User', UserSchema);
export default User;
