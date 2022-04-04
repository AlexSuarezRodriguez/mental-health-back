const supertest= require('supertest');

const app = require('../../app')

const request = supertest(app);

describe('service EndPoints', () => {
  describe('GET /services',()=>{
    test('should respond with a 200 status code', async () => {
      const res = await request.get('/api/services');
       
      expect(res.statusCode).toEqual(200);    
    });
  
    test('should respond with an array of service', async () => {
      const res = await request.get('/api/services');
     
      expect(res.body).toBeInstanceOf(Array);  
    });
  
    test('should respond with an array of service and with date specifics', async () => {
      const res = await request.get('/api/services');
     
      expect(res.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          title:expect.any(String),
          description:expect.any(String),
        }),
      ]));
    });

  });

  describe('POST /services',()=>{
    test('should respond with a 201 status code', async () => {

      const service={
        title:'hffcytfdtydydcxd',
        description:'yutftydftydytrdytdty ',
      }
      const res = await request.post('/api/services/').send(service);

      expect(res.statusCode).toEqual(201);
    });
  });

});