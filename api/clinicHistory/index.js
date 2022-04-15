const { Router } = require('express');
const { hasRole, isAuthenticated } = require('../../auth/auth.service');
const {
  handlerAllClinicHistory,
  handlerOneClinicHistory,
  handlerCreateChistory,
  handlerUpdateChistory,
  handlerDeleteChistory,
  handlerCHistoryByUserId,
} = require('./clinicHistory.controller');

const router = Router();

router.get('/', handlerAllClinicHistory);
router.get('/:id', handlerOneClinicHistory);
router.get('/chistpat/:id', handlerCHistoryByUserId);
router.post('/', isAuthenticated(), handlerCreateChistory);
router.patch('/:id', hasRole(['doctor']), handlerUpdateChistory);
router.delete('/:id', hasRole(['doctor']), handlerDeleteChistory);

module.exports = router;
