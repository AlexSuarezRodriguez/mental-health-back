const supertest= require('supertest');

const app = require('../../app')

const request = supertest(app);

describe('users EndPoints', () => {
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
      
      const id='62461f487046652c36657e8f';

      const res = await request.get(`/api/users/${id}`);
      
      expect(res.statusCode).toEqual(200);  
    });
    
    test('should respond with an array of user and with date specifics GET/:id', async () => {

      const id='62461f487046652c36657e8f';
      const res = await request.get(`/api/users/${id}`);
     
      expect(res.body).toEqual(expect.objectContaining({
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
  
  describe('POST /api/users',()=>{
    test('should respond with a 201 status code POST', async () => {
      const res = await request.post('/api/users').send({
        firstName: 'javier',
        lastName: 'rodriguez',
        email: 'javier@rodriguezpo.com',
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

  describe('PATCH /tasks/:id ', () => {
    test('should respond with a 200 status code PACTH', async () => {
      const id ='624277066d633186da8a6721' ;
      const user = {
        firstName: 'vicente',
      };
    
      const res = await request.patch(`/api/users/${id}`).send(user);
      // Assert
      expect(res.statusCode).toEqual(201);
    });
    
    test('should respond with the updated user PACTH', async () => {
      // Arrange
      const id ='624277066d633186da8a6721' ;
      const user = {
        firstName: 'vicente',
      };
      
      const res = await request.patch(`/api/tasks/${id}`).send(user);
      
      expect(res.body).toBeInstanceOf(Object); 
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
      const res = await request.delete(`/api/users`).send({
        email: 'javier@rodriguezpo.com',
      });
      // Assert
      expect(res.statusCode).toEqual(200);
    });

    test('should respond with a 404 status code if search for id DELETE/:id', async () => {   
      
      const id='62461f4e8fpoiu';

      const res = await request.get(`/api/users/${id}`);
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({message:'error'});
    });
         
  });

});    


