import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import routes from '../routes';
import { errorHandler } from '../middleware/errorHandler';
import { logger } from '../utils/logger';

let app: express.Application;
let server: any;

beforeAll(async () => {
  app = express();
  app.use(express.json());
  app.use((req, _res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
  });
  app.use('/api', routes);
  app.use(errorHandler);

  await mongoose.connect('mongodb://localhost:27017/security-config-test');
  server = app.listen(3002);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe('API Endpoints', () => {
  // Health check
  test('GET /api/health should return 200', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
  });

  // Security Configurations
  test('GET /api/security/configs should return 200', async () => {
    const response = await request(app).get('/api/security/configs');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('POST /api/security/configs should return 201', async () => {
    const config = {
      name: 'Test Config',
      description: 'Test configuration',
      cloudProvider: 'aws',
      securityService: 'firewall',
      region: 'us-east-1',
      networkZones: [
        {
          name: 'trust',
          cidr: '10.0.1.0/24',
          description: 'Internal trusted network'
        }
      ],
      threatPrevention: {
        enabled: true,
        rules: [
          {
            name: 'Web Access',
            action: 'allow',
            source: 'trust',
            destination: 'untrust',
            protocol: 'tcp',
            port: '443'
          }
        ]
      },
      logging: {
        enabled: true,
        level: 'info',
        retention: 30
      }
    };
    const response = await request(app).post('/api/security/configs').send(config);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  // CVE Management
  test('GET /api/cve/search should return 200', async () => {
    const response = await request(app).get('/api/cve/search');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/cve/alerts should return 200', async () => {
    const response = await request(app).get('/api/cve/alerts');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Dashboard
  test('GET /api/dashboard/stats should return 200', async () => {
    const response = await request(app).get('/api/dashboard/stats');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('totalConfigs');
    expect(response.body).toHaveProperty('activeConfigs');
  });

  // Compliance
  test('GET /api/compliance/status should return 200', async () => {
    const response = await request(app).get('/api/compliance/status');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('overallScore');
    expect(response.body).toHaveProperty('standards');
  });

  test('GET /api/compliance/issues should return 200', async () => {
    const response = await request(app).get('/api/compliance/issues');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
}); 