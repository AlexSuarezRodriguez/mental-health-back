const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../../middleware/validate-field');

const { handlerGoogleSignIn } = require('./google.controller');

const router = Router();

router.post(
  '/signin',
  [
    check('googleToken', 'googleToken is required').not().isEmpty(),
    validateFields,
  ], 
  handlerGoogleSignIn
);

module.exports = router;