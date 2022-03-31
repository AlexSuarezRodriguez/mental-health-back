const {Router} = require ('express');
const {
    handlerAllClinicHistory,
    handlerOneClinicHistory,
    handlerCreateChistory,
    handlerUpdateChistory,
    handlerDeleteChistory
 } = require ('./clinicHistory.controller');
const router = Router();

router.get('/', handlerAllClinicHistory)
router.get('/:id', handlerOneClinicHistory)
router.post('/', handlerCreateChistory)
router.patch('/:id',hasRole(['doctor']), handlerUpdateChistory)
router.delete('/:id', handlerDeleteChistory)

module.exports = router