const express = require('express');

const router = express.Router();

const correctMiddleware = require('../../middlewares/correctMiddleware');

const {
  addUser,
  getUser,
  updateUser,
  delUser,
} = require('./controller');

router
  .route('/:id')
  /* ST1: GET /user:id
  Descripción: Obtienes el objeto entero de un usuario */
  .get(getUser)

  /* ST2: DELETE /user/:id
  Descripción: Se puede borrar objeto user a través de su ID */
  .delete(delUser)

  /* ST3: PUT /user/:id
  Descripción: Se puede actualizar un usuario a través de su ID */
  .put(updateUser);

/* ST4: POST /user
  Descripción: Crea un usuario */
router.route('/').post(addUser, correctMiddleware);


module.exports = router;
