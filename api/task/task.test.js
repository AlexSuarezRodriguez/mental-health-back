/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const mongoose = require('mongoose');
const {
  patientUser,
} = require('../user/user.factory');
const UserModel = require('../user/user.model');
const { signToken } = require('../../auth/auth.service');

const app = require('../../app');
const connectDB = require('../../config/database');

const request = supertest(app);
let user;
let userToken;

describe('users EndPoints', () => {
  beforeAll(async () => {
    await connectDB();
<<<<<<< HEAD
    user = await UserModel.create(patientUser); // traer el primer user
=======
    user = await UserModel.create(patientUser);
>>>>>>> 5b0dcc1c801ce2997210b9a15bb9c472c6247c0f
    userToken = signToken(user.profile);
  });
  afterAll(async () => {
    await UserModel.findByIdAndDelete(user.id);
    await mongoose.connection.close();
  });
  describe('Get all tasks', () => {
    test('should respond with a 200 status code', async () => {
      const allTasks = await request.get('/api/tasks').set('authorization', `Bearer ${userToken}`);
      expect(allTasks.statusCode).toEqual(200);
    });
    test('Should get an array of tasks', async () => {
      const allTasks = await request.get('/api/tasks').set('authorization', `Bearer ${userToken}`);
      expect(allTasks.body).toBeInstanceOf(Array);
    });
  });
  describe('Post task', () => {
    test('Shoul respond with a 200 status code POST', async () => {
      const newTask = await request.post('/api/tasks').set('authorization', `Bearer ${userToken}`).send({
        title: 'Prueba crear nueva tarea',
      });
      expect(newTask.statusCode).toEqual(200);
      expect(newTask.body).toEqual(
        expect.objectContaining({
          title: expect.any(String),
        }),
      );
    });
  });
  describe('PATCH task', () => {
    test('should respond with a 200 status code PATCH', async () => {
      const task = {
        title: 'patch task',
      };
      const res = await request.get('/api/tasks').set('authorization', `Bearer ${userToken}`);
      const searchById = res.body[0]._id;
      const response = await request.patch(`/api/tasks/${searchById}`).set('authorization', `Bearer ${userToken}`).send(task);
      expect(response.statusCode).toEqual(200);
    });
  });
  describe('DELETE task', () => {
    test('Should respond with a 200 status code DELETE', async () => {
      const res = await request.get('/api/tasks').set('authorization', `Bearer ${userToken}`);
      const searchById = res.body[0]._id;
      const response = await request.delete(`/api/tasks/${searchById}`).set('authorization', `Bearer ${userToken}`);
      expect(response.statusCode).toEqual(204);
    });
  });
});
