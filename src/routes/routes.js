const Router = require('express');
const { contentSecurityPolicy } = require('helmet');
const passport = require('passport');
const { addUser, loginUser, createUser, history } = require('../api/user/controller');
//const authMiddleware = require('../middlewares/authMiddleware');
const computeECM = require('../utils/computeECM');
const { checkToken } = require('../middlewares/checkToken')

const router = Router();

// test endpoint
router.get('/', (req, res) => {
  res.send("Hello World! I'm a API server");
});

router.post('/computeECM', checkToken, computeECM)

router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/history', checkToken, history)


/* ST10: POST /register
Description: Registra al usuario y lo, guarda la sesión usando una estratégia local y envía la información del usuario. En este proceso a través de la función TASK3 para verficiar el correo introducido. */
//router.route('/register').post(addUser, authMiddleware);

/* ST11: POST /login
Description: Guarda la sesión usando una estratégia local y envía la información al usuario */
//router.post('/login', authMiddleware);



router.get('/testauth', (req, res, next) => {
  if (req.isAuthenticated())
    res.send({
      OK: 1,
      message: 'Usuario está autenticado',
    });
  else {
    console.log('error de autenticacion');
    next({
      status: 404,
      message: 'usuario no autenticado',
    });
  }
});

module.exports = router;
