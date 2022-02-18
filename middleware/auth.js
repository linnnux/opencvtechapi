const jwt = require('jsonwebtoken');

module.exports = (req,res, next)=>
{
    try
    {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN');

        //console.log('token = '+token);
        //console.log('decodedToken = ' +decodedToken.userId);

        const userId = decodedToken.userId;
        //req.userId = userId; //
        req.auth = { userId : userId }; // racourci

        if (req.body.userId && req.body.userId !== userId)
        {
          throw 'invalid id';
        }
        else
        {
          next();
        }
    }
    catch
    {
      res.status(401).json({
                              error : new ERROR('invalid request ! ')
                            });

   }

};
