import request from 'supertest';
import app from '../../../src/app';
import prisma from '../../../src/database/prisma';
import { ITaskCreateRequest } from '../../../src/interfaces';

const fakeRequest: ITaskCreateRequest = {
  content: 'fake task',
};

describe('POST /task', () => {
  afterAll(async () => {
    await prisma.task.deleteMany();
  });

  describe('success', () => {
    it('should send status 201 and the created task', async () => {
      const { status, body } = await request(app).post('/task').send(fakeRequest);

      expect(status).toBe(201);

      expect(body.content).toBe(fakeRequest.content);
      expect(body.status).toBe('PENDING');
      expect(body.createdAt).toBeDateString();
      expect(body.id).toBeUuid();
    });
  });
});
