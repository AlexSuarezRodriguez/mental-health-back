/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../app');
const {
  patientUser,
  doctorUser,
} = require('../../user/user.factory');
const UserModel = require('../../user/user.model');
const { signToken } = require('../../../auth/auth.service');
const connectDB = require('../../../config/database');
const clinicHistory = require('../clinicHistory.model');

const request = supertest(app);
let user;
let userToken;

describe('clinic History Endpoints', () => {
  beforeAll(async () => {
    await connectDB();
    user = await UserModel.create(doctorUser);
    userToken = signToken(user.profile);
  });
  afterAll(async () => {
    await UserModel.findByIdAndDelete(user.id);
    await clinicHistory.findByIdAndDelete(clinicHistory.id);
    await mongoose.connection.close();
  });

  describe('Get All Clinic History', () => {
    test('should respond with a 200 status code GET', async () => {
      const res = await request.get('/api/clinicHistorys');

      expect(res.statusCode).toEqual(200);
    });

    test('should respond with an array of users GET', async () => {
      const res = await request.get('/api/clinicHistorys');

      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe('Get a clinic History for id', () => {
    test('should respond with a 200 status code if search for id GET/:id', async () => {
      const id = '626ac2663018fa7799269e56';

      const res = await request.get(`/api/clinicHistorys/${id}`);

      expect(res.statusCode).toEqual(200);
    });
  });
});
