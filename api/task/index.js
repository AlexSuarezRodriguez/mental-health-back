const {Router} = require ('express');
const {handlerAllTasks, handlerOneTask, handlerCreateTask, handlerUpdateTask, handlerDeleteTask} = require ('./task.controller');
const router = Router();

router.get('/', handlerAllTasks)
router.get('/:id', handlerOneTask)
router.post('/', handlerCreateTask)
router.put('/:id', handlerUpdateTask)
router.delete('/:id', handlerDeleteTask)

module.exports = router