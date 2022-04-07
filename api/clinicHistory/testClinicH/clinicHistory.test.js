const supertest = require('supertest');
const app = require('../../../app');
const connectDB = require('../../../config/database');
const clinicHistory = require('../clinicHistory.model');
const request = supertest(app);


describe('clinic History Endpoints', () => {
    
  
    test('Post clinicHistory', async () => {
      const res = await request
        .post('/api/clinicHistorys')
        .send({
          description: 'paciente con depresión',
        });
  
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(expect.objectContaining({
        description: 'paciente con depresión',
      }));
    });
  
    test('should not create a same clinicHistory', async () => {
      const res = await request
        .post('/api/clinicHistorys')
        .send({
          description: 'paciente con depresión',
        });
  
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({message: 'error'});
    });
  });