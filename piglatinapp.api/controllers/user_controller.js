import User from '../models/user_model';

module.exports = {
    
    createUser: (req,res) => {
        console.log('en controlador de user')
        let user = new User(req.body);

        user.save()
            .then(user => res.json(user))
            .catch(err => res.json(err))

            console.log(user);
    }
}