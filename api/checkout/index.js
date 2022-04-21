const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');
const { handlerCheckout } = require('./checkout.controller');

const router = Router();

router.post('/', isAuthenticated(), handlerCheckout);

module.exports = router;
