const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.service');
const {
  handlerAllTasks, handlerOneTask, handlerCreateTask, handlerUpdateTask, handlerDeleteTask,
} = require('./task.controller');

const router = Router();

router.get('/', handlerAllTasks);
router.get('/:id', handlerOneTask);
router.post('/', isAuthenticated(), handlerCreateTask);
router.patch('/:id', hasRole(['patient']), handlerUpdateTask);
router.delete('/:id', hasRole(['patient']), handlerDeleteTask);

module.exports = router;
