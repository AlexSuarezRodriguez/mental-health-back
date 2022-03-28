const { Router } = require('express');

const {
  handlerAllService,
  handlerOneService,
  handlerCreateService,
  handlerDeleteService,
  handlerUpdateService
} = require('./service.controller')

const router = Router();

router.get('/', handlerAllService)
router.get('/service', handlerOneService)
router.post('/', handlerCreateService)
router.delete('/:id',handlerDeleteService)
router.patch('/:id', handlerUpdateService)

module.exports = router;