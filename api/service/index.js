const { Router } = require('express');
const {isAuthenticated, hasRole}=require('../../auth/auth.service')

const {
  handlerAllService,
  handlerOneService,
  handlerCreateService,
  handlerDeleteService,
  handlerUpdateService
} = require('./service.controller')

const router = Router();

router.get('/', handlerAllService)
router.get('/:id', handlerOneService)
// router.get('/service', handlerOneService)
// router.get('/service/:id', handlerOneService)
router.post('/',isAuthenticated(), handlerCreateService)
router.delete('/:id',hasRole(['doctor']),handlerDeleteService)
router.patch('/:id',hasRole(['admin']), handlerUpdateService)

module.exports = router;