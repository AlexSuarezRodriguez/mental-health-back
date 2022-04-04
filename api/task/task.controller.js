const {getAllTasks, getOneTask, createTask, updatedTask, deleteTask}= require ('./task.service');

async function handlerAllTasks (req, res){
    const tasks = await getAllTasks();
    res.json(tasks)

}

async function handlerOneTask(req, res) {
    const id = req.params.id;
    const task = await getOneTask(id);
  
    if (!task) {
      res.status(404).json({ message: `Task not found with id: ${id}` });
    } else {
      res.json(task);
    }
  }

async function handlerCreateTask (req, res){
    const newTask = {...req.body, userId:req.user._id}
    const task = newTask && await createTask(newTask);
    if (!task.title) {
        res.status(404).json({ message: `Task not create` });
      } else {
        res.json(task);
      }
}

async function handlerUpdateTask (req, res){
    const { id } = req.params;
    const { body } = req;
    const task = await updatedTask(id, body);
    if (!task) {
        res.status(404).json({message: `the task doesnt exist`});
    } else {
        res.json(task);
    }

}

async function handlerDeleteTask (req, res){
    const id = req.params.id;
    await deleteTask(id)
    res.status(204).send({});
}

module.exports = {
    handlerAllTasks,
    handlerOneTask,
    handlerCreateTask,
    handlerUpdateTask,
    handlerDeleteTask
}