const supertest= require('supertest');
const mongoose = require('mongoose');

const app = require('../../app')
const connectDB = require('../../config/database');
const users = require('./user.model');

const request = supertest(app);

describe('users EndPoints', () => {
  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await users.deleteMany();
    
    await mongoose.connection.close();
  });
  describe('POST /api/users',()=>{
    test('should respond with a 201 status code POST', async () => {
      const res = await request.post('/api/users').send({
        firstName: 'javier',
        lastName: 'rodriguez',
        email: 'javiermsvsdark@rodriguezpo.com',
        password: '123',
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(expect.objectContaining({
        email:expect.any(String),
        firstName:expect.any(String),
        lastName:expect.any(String),
        password:expect.any(String),
        role:expect.any(String),
      }));
      });

    test('should respond with a 404 status code POST', async () => {
      const res = await request.post('/api/users').send({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({message:'error'});  
      });
    });
   
  describe('GET /api/users',()=>{
    test('should respond with a 200 status code GET', async () => {
        const res = await request.get('/api/users');
        
        expect(res.statusCode).toEqual(200);    
      });
    
    test('should respond with an array of users GET', async () => {
        const res = await request.get('/api/users');

        expect(res.body).toBeInstanceOf(Array);  
      }); 
    }); 
      
  describe('GET /api/users/:id',()=>{
    test('should respond with a 200 status code if search for id GET/:id', async () => { 
      
      const res = await request.get('/api/users');
      const searchID=res.body[0]._id;
      const respond = await request.get(`/api/users/${searchID}`);
      
      expect(respond.statusCode).toEqual(200);  
      });

    test('should respond with an array of user and with date specifics GET/:id', async () => {

      const res = await request.get('/api/users');
      const searchID=res.body[0]._id;
      const respond = await request.get(`/api/users/${searchID}`);
     
      expect(respond.body).toEqual(expect.objectContaining({
          email:expect.any(String),
          firstName:expect.any(String),
          lastName:expect.any(String),
          password:expect.any(String),
          role:expect.any(String),
        }));
      });
      
    test('should respond with a 404 status code if search for id GET/:id', async () => {   
        
        const id='62461f4e8fpoiu';
        
        const res = await request.get(`/api/users/${id}`);
        
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({message:'error'});
      });   

    });
    
  describe('PATCH /tasks/:id ', () => {
    test('should respond with a 200 status code PACTH', async () => {
      const user = {
        firstName: 'vicente',
      };
      const res = await request.get('/api/users');
      const searchID=res.body[0]._id;
      const respond = await request.patch(`/api/users/${searchID}`).send(user);
  
      expect(respond.statusCode).toEqual(201);
      });
    
    test('should respond with a object updated the user PACTH', async () => {
      
      const user = {
        firstName: 'vicente',
      };
      const res = await request.get('/api/users');
      const searchID=res.body[0]._id;
      const respond = await request.patch(`/api/users/${searchID}`).send(user);
      
      expect(respond.body).toBeInstanceOf(Object); 
      });
  
    test('should respond with a 404 status code if search for id PACTH',async ()=>{
      const id='62461f4e8fpoiu';
      const user = {
          firstName: 'vicente',
      };
      const res = await request.patch(`/api/users/${id}`).send(user);
      
      expect(res.statusCode).toEqual(500);
      expect(res.body).toEqual({message:'error'});
      });
    });
  
  describe('DELETE /tasks/:id', () => {
    test('should respond with a 200 status code when delete user for body DELETE/:id', async () => {  
      
      const res = await request.get('/api/users');
      const searchID=res.body[0]._id;
      const response = await request.delete(`/api/users/${searchID}`)

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object); 
    });

    test('should respond with a 404 status code if search for id DELETE/:id', async () => {   
      
      const id='62461f4e8fpoiu';

      const res = await request.get(`/api/users/${id}`);
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({message:'error'});
    });
  });
  
});
   


