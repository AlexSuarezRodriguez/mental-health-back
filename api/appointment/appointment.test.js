/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const connectDB = require('../../config/database');

const request = supertest(app);

describe('Appointments EndPoints', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });
  describe('Get all appointments', () => {
    test('should respond with a 200 status code', async () => {
      const allAppointments = await request.get('/api/appointments');
      expect(allAppointments.statusCode).toEqual(200);
    });
    test('should get an array of appointments', async () => {
      const allAppointments = await request.get('/api/appointments');
      expect(allAppointments.body).toBeInstanceOf(Array);
    });
  });
  describe('Get one appointment', () => {
    test('should respond with a 200 status code', async () => {
      const allAppointments = await request.get('/api/appointments');
      const taskId = allAppointments.body[0]._id;
      const oneAppointment = await request.get(`/api/appointments/${taskId}`);
      expect(oneAppointment.statusCode).toEqual(200);
    });
    test('should respond with a array', async () => {
      const allAppointments = await request.get('/api/appointments');
      const taskId = allAppointments.body[0]._id;
      const oneAppointment = await request.get(`/api/appointments/${taskId}`);
      expect(oneAppointment.body).toBeInstanceOf(Array);
    });
    test('should respond with a 404 when task is not found', async () => {
      const id = 'dfsafsadfsdfsd';
      const getWrongTask = await request.get(`/api/appointments/${id}`);
      expect(getWrongTask.statusCode).toEqual(400);
    });
  });
});
