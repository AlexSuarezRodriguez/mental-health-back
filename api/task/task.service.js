/* eslint-disable no-underscore-dangle */
const taskModel = require('./task.model');

async function getAllTasks(user) {
  const tasks = await taskModel.find({ userId: user._id, status: false });
  return (tasks);
}

async function getOneTask(id) {
  const task = await taskModel.findById(id).populate({ path: 'userId', select: 'firstName lastName' });
  return (task);
}

async function createTask(task) {
  const newTask = await taskModel.create(task);
  return (newTask);
}

async function updatedTask(id, task) {
  const taskUpdated = await taskModel.findByIdAndUpdate(id, task, { new: true });
  return (taskUpdated);
}

async function deleteTask(id) {
  const taskDeleted = await taskModel.findByIdAndDelete(id);
  return (taskDeleted);
}

module.exports = {
  getAllTasks, getOneTask, createTask, updatedTask, deleteTask,
};
