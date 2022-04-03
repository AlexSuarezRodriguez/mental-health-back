const {Router} = require ('express');
const {isAuthenticated, hasRole}=require('../../auth/auth.service')
const {
    handlerAllAppoiments,
    handlerOneAppoiments,
    handlerCreateAppoiment,
    handlerUpdateAppoiments,
    handlerDeleteAppoiments
 } = require ('./appoiment.controller');
const router = Router();

router.get('/', isAuthenticated(), handlerAllAppoiments)
router.get('/:id', isAuthenticated(), handlerOneAppoiments)
router.post('/', hasRole(['patient']), handlerCreateAppoiment)
router.patch('/:id', hasRole(['doctor']), handlerUpdateAppoiments)
router.delete('/:id', hasRole(['doctor','patient']), handlerDeleteAppoiments)

module.exports = router