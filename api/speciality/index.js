const { Router } = require('express');

const {
  handlerAllSpeciality,
  handlerOneSpeciality,
  handlerCreateSpeciality,
  handlerUpdateSpeciality,
  handlerDeleteSpeciality
} = require('./speciality.controller');

const router = Router();

router.get('/', handlerAllSpeciality);
router.get('/:id', handlerOneSpeciality);
router.post('/', handlerCreateSpeciality);
router.put('/:id', handlerUpdateSpeciality);
router.delete('/:id', handlerDeleteSpeciality);

module.exports = router;
