const { Router } = require('express');

const { handlerLogin, handlerVerifyAccount } = require('./local.controller');

const router = Router();

router.post('/login', handlerLogin);
router.get('/verify/:token', handlerVerifyAccount);

module.exports = router;
