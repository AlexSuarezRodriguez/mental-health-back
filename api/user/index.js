const { Router } = require('express');
const {
  handlerGetAllUsers,
  handlerGetUserById,
  handlerCreateUser,
  handlerUpdateUser,
  handlerDeleteUser,
} = require('./user.controller');

const router = Router();

router.get('/', handlerGetAllUsers);
router.get('/:id', handlerGetUserById);
router.post('/', handlerCreateUser);
router.patch('/:id', handlerUpdateUser);
router.delete('/:id', handlerDeleteUser);
// router.delete('/', handlerDeleteUser);

module.exports = router;
