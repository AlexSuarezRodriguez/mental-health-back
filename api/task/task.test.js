const supertest= require('supertest');
const mongoose = require('mongoose');

const app = require('../../app')
const connectDB = require('../../config/database');
const request = supertest(app);

describe('users EndPoints', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('Get all tasks',() => {
    test('should respond with a 200 status code', async () => {
      const allTasks = await request.get('/api/tasks');
      expect(allTasks.statusCode).toEqual(200);
    });
    test('should get an array of tasks', async () => {
      const allTasks = await request.get('/api/tasks');
      expect(allTasks.body).toBeInstanceOf(Array);
    });
  });
  describe('Get one task',() => {
    test('should respond with a 200 status code', async () => {
      const allTasks = await request.get('/api/tasks');
      const taskId = allTasks.body[0]._id;
      const oneTask = await request.get(`/api/tasks/${taskId}`);
      expect(oneTask.statusCode).toEqual(200);
    });
    test('should respond with a array', async () => {
      const allTasks = await request.get('/api/tasks');
      const taskId = allTasks.body[0]._id;
      const oneTask = await request.get(`/api/tasks/${taskId}`);
      expect(oneTask.body).toEqual(expect.objectContaining({
        title:'Wendy quiere comer',
        status:true,
      }));
    });
    test('should respond with a 404 when task is not found', async () => {
      const getWrongTask = await request.get('/api/tasks/62492d550969908e97b30032');
      expect(getWrongTask.statusCode).toEqual(404);
    });
  });
});