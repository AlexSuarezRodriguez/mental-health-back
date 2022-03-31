const { Router } = require('express');
const {
  handlerGetAllUsers,
  handlerGetUserById,
  handlerGetUserByEmail,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
} = require('./user.controller');

const router = Router();

router.get('/', handlerGetAllUsers)
router.get('/email', handlerGetUserByEmail)
router.get('/:id', handlerGetUserById)
router.post('/', handlerCreateUser)
router.patch('/:id', handlerUpdateUser)
router.delete('/:id', handlerDeleteUser)

module.exports = router;