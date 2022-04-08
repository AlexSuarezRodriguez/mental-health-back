const supertest = require('supertest');
const app = require('../../../app');
const mongoose = require ('mongoose')
const connectDB = require('../../../config/database');
const clinicHistory = require('../clinicHistory.model');
const request = supertest(app);


describe('clinic History Endpoints', () => {
  beforeAll (async ()=>{
    await connectDB();
  });
  afterAll (async ()=>{
    await mongoose.connection.close();
  });

  describe ('Post clinicHistory', ()=>{
    test('Post clinicHistory', async () => {
      const res = await request
        .post('/api/clinicHistorys')
        .send({
          description: 'paciente con depresión'          
        });
  
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(expect.objectContaining({
        description: 'paciente con depresión',
      }));
    });

  })

  describe('GetAll cliniciHistory',  ()=>{
    test('should respond with a 200 status code GET', async () => {
      const res = await request.get('/api/clinicHistorys');
       
      expect(res.statusCode).toEqual(200);    
    });
  
    test('should respond with an array of users GET', async () => {
      const res = await request.get('/api/clinicHistorys');
     
      expect(res.body).toBeInstanceOf(Array);  
    });  
    
  })

  describe('Get clinicHistory', ()=>{
    test('should respond with a 200 status code if search for id GET/:id', async () => {   
      
      const id='6250afbbd532399353b938e7';

      const res = await request.get(`/api/clinicHistorys/${id}`);
      
      expect(res.statusCode).toEqual(200);  
    });
  })

  
  
    
  
 });