const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.service');
const {
  handlerAllTasks, handlerOneTask, handlerCreateTask, handlerUpdateTask, handlerDeleteTask,
} = require('./task.controller');

const router = Router();

router.get('/', isAuthenticated(), handlerAllTasks);
router.get('/:id', isAuthenticated(), handlerOneTask);
router.post('/', isAuthenticated(), handlerCreateTask);
router.patch('/:id', hasRole(['patient']), handlerUpdateTask);
router.delete('/:id', hasRole(['patient']), handlerDeleteTask);

module.exports = router;
