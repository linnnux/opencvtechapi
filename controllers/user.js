
const User = require('../models/User');
//const bcrypt = require('bcrypt');
const bcrypt = require('../app.js').bcrypt


const jwt = require('jsonwebtoken');


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
  User.findOne({ email : req.body.email })
      .then(user=>{
        if(!user)
        {
          return res.status(401).json({ error: 'email error'});
        }
        else
        {
          bcrypt.compare(req.body.password, user.password)
          .then(valid=>{
            if(!valid)
            {
              return res.status(401).json({ error: 'mdp error'});

            }
            const token = jwt.sign( {userId : user._id}, 'RANDOM_SECRET_TOKEN', {expiresIn:'2h'});

            console.log(token);

            res.status(200).json({
                                  userId: user._id,
                                  token : token
                                });
            })
          .catch(error=>res.status(500).json({error}));

        }
      })
      .catch(error=>res.status(500).json({error}));


});
