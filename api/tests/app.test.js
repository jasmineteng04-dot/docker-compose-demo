const request = require('supertest');
const app     = require('../index');
 
describe('Health endpoint', () => {
  it('returns 200 and status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
 
describe('Items endpoints', () => {
  it('GET /items returns an array', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
 
  it('POST /items creates a new item', async () => {
    const res = await request(app)
      .post('/items')
      .send({ name: 'Test Widget' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Widget');
  });
});
