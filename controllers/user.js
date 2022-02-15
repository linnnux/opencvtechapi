
const User = require('../models/User');
const bcrypt = require('bcrypt');


//post : create new user
exports.signup = ('/',(req,res,next)=>
{
  bcrypt.hash(req.body.password, 10)
        .then( hash => {
          const user = new User({
            email:req.body.email,
            password:hash
          });
          user.save()
              .then(() => res.status(201).json({ message: 'User registred !'}))
              .then(console.log('201'))
              .catch(error=>res.status(500).json({error}));


        })
        .catch(error=>res.status(500).json({error}));
});


// login
exports.login = ('/',(req,res,next)=>
{

});
