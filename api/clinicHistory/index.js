const {Router} = require ('express');
const {isAuthenticated, hasRole}=require('../../auth/auth.service')
const {
    handlerAllClinicHistory,
    handlerOneClinicHistory,
    handlerCreateChistory,
    handlerUpdateChistory,
    handlerDeleteChistory
 } = require ('./clinicHistory.controller');
const router = Router();


router.get('/',  handlerAllClinicHistory)
router.get('/:id',  handlerOneClinicHistory)
router.post('/',  handlerCreateChistory)
router.patch('/:id', hasRole(['doctor']), handlerUpdateChistory)
router.delete('/:id', hasRole(['doctor']), handlerDeleteChistory)

module.exports = router