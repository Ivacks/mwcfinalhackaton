const jwt = require('jsonwebtoken');
const User = require('../api/user/model');




exports.checkToken = async (req, res, next) => {

  const token = req.headers['authorization'];
  const userToken = jwt.decode(token);

  try {

    const user = await User.find({ email: userToken.user });

    const match = jwt.verify(token, "secretNuwe")
    if (!match) {
      res.status(404).json({
        status: 'Error',
        message: 'Invalid token'
      })
    } else {
      /*       res.status(200).json({
              status: 'Ok',
              message: 'You´re in'
            }); */
      req.user = match;
      next();
    };

  } catch (err) {
    console.log(err)
    res.status(404).json({
      status: 'Error',
      message: 'Something go wrong'
    })
  }

};