const User = require('./model');
const md5 = require('md5');
const jwt = require('jsonwebtoken');


const { addUserDB, getUserDB, delUserDB, updateUserDB, } = require('./helpers');


exports.addUser = async (req, res, next) => {
  const emailScore = await mailboxlayer(req.body.email);
  if (emailScore < 0.6) {
    next({
      status: 401,
      message: `El correo electrónico no es válido (score bajo) ${req.body.email} ${emailScore}`,
    });
  }
  addUserDB(req.body)
    .then((response) => {
      req.response = response;
      next();
    })
    .catch((error) => {
      next({
        status: 400,
        message: `ERROR, usuario NO añadido:, ${error}`,
      });
    });
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;

  getUserDB(id)
    .then((response) => {
      if (response)
        res.send({
          OK: 1,
          status: 200,
          message: `usuario ${id} obtenido`,
          user: response,
        });
      else
        next({
          status: 400,
          message: `No existe el usuario con esta ID: ${id}`,
        });
    })
    .catch((error) => {
      next({
        status: 500,
        message: `ERROR, no se ha podido obtener usuario: ${error}`,
      });
    });
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { username, password, email, repos } = req.body;

  updateUserDB(id, req.body)
    .then((response) => {
      if (response) {
        res.send({
          OK: 1,
          message: `usuario actualizado`,
          id: response.id,
        });
      } else {
        next({
          status: 400,
          message: `No existe el usuario con esta ID: ${id}`,
        });
      }
    })
    .catch((error) => {
      next({
        status: 500,
        message: `ERROR, no se ha podido obtener usuario: ${error}`,
      });
    });
};

exports.delUser = async (req, res, next) => {
  const { id } = req.params;
  delUserDB(id)
    .then((response) => {
      if (response) {
        res.send({
          OK: 1,
          message: `usuario eliminado`,
          id: response.id,
        });
      } else {
        next({
          status: 400,
          message: `No existe el usuario con esta ID: ${id}`,
        });
      }
    })
    .catch((error) =>
      next({
        status: 500,
        message: `ERROR, no se ha podido encontrar usuario: ${error}`,
      }),
    );
};

exports.createUser = async (req, res) => {
  // 1) Comprobar si el usuario existe en nuestra base de datos

  // Recogemos los campos mail y pass del usuario
  const { email, password, username } = req.body;

  // Busco en la base de datos si lo tengo
  const match = await User.find({ email });
  // console.log(match.length);
  try {

    // No está en nuestra base de datos, creémoslo
    if (!match.length) {
      // Generamos el random hasheado para guardarlo como secret
      const passKey = "secretNuwe";
      User.create({ email, username, password: md5(password) });

      // Notificamos el éxito de la operación
      res.status(200).json({
        status: 'Success',
        message: 'User registered'
      });

      // Ya está en nuestra base de datos, redireccionamos al endpoint '/login'
    } else {
      console.log('Ya estás registrado');
      res.status(301).redirect('/login');
    };

  } catch (err) {
    console.log(err)
    // Notificamos que ha habido algún problema con el servidor
    res.status(404).json({
      status: 'Error',
      message: err
    });

  };

};



exports.loginUser = async (req, res) => {
  // Recogemos los campos enviaos por el usuario para loguearse
  const { email, password } = req.body;

  // Buscamos en la base de datos si existe el usuario
  const user = await User.findOne({ email, password: md5(password) });

  try {
    // Si existe, le mandamos el jwt
    if (user) {
      const payload = {
        user: email,
        check: true
      }
      const token = jwt.sign(payload, "secretNuwe")
      console.log(token);

      res.status(200).json({
        status: 'ok',
        token
      });

    } else {
      res.status(404).json({
        status: 'Error',
        message: 'User not found'
      });
    };

  } catch (err) {
    console.log(err);
  };


};

exports.history = async (req, res) => {
  const email = req.user.user;
  const result = await User.findOne({ email });
  console.log(result);

  res.send({
    status: "ok",
    scores: result.scores
  })
};

