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

router.get('/',isAuthenticated(), handlerAllService)
router.get('/service',isAuthenticated(), handlerOneService)
router.post('/',isAuthenticated(), handlerCreateService)
router.delete('/:id',hasRole(['doctor']),handlerDeleteService)
router.patch('/:id',hasRole(['admin']), handlerUpdateService)

module.exports = router;