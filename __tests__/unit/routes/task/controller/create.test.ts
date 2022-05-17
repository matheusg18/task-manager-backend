import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ITask, ITaskCreateRequest } from '../../../../../src/interfaces';
import TaskController from '../../../../../src/routes/task/controller';
import TaskService from '../../../../../src/routes/task/service';

jest.mock('../../../../../src/routes/task/service');

const mockService = new TaskService({} as PrismaClient);
const taskController = new TaskController(mockService);

const fakeTask: ITask = {
  id: '12345abcde',
  content: 'fake task',
  status: 'PENDING',
  createdAt: new Date(),
};

describe('TaskController create - unit test', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = jest.fn();

  beforeAll(() => {
    req.body = { content: fakeTask.content } as ITaskCreateRequest;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    mockService.create = jest.fn().mockResolvedValue(fakeTask);
  });

  afterAll(() => {
    (TaskService as jest.Mock).mockClear();
  });

  it('should send status 201 and the created task', async () => {
    await taskController.create(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeTask);
    expect(next).toHaveBeenCalled();
  });
});
