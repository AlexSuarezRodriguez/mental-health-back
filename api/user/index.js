const { Router } = require('express');
const {
  handlerAllUsers,
  handlerGetOneUser,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
} = require('./user.controller');

const { createUser } = require('./user.service');

const router = Router();
router.get('/', handlerAllUsers)
router.get('/:id', handlerGetOneUser)
router.post('/', handlerCreateUser)
router.patch('/:id', handlerUpdateUser)
router.delete('/:id', handlerDeleteUser)

module.exports = router;