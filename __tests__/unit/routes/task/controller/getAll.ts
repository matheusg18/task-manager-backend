import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ITask } from '../../../../../src/interfaces';
import TaskController from '../../../../../src/routes/task/controller';
import TaskService from '../../../../../src/routes/task/service';

jest.mock('../../../../../src/routes/task/service');

const mockService = new TaskService({} as PrismaClient);
const taskController = new TaskController(mockService);

const fakeTaskList: ITask[] = [
  {
    id: '12345abcde',
    content: 'fake task',
    status: 'PENDING',
    createdAt: new Date(),
  },
];

describe('TaskController getAll - unit test', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = jest.fn();

  beforeAll(() => {
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    mockService.getAll = jest.fn().mockResolvedValue(fakeTaskList);
  });

  afterAll(() => {
    (TaskService as jest.Mock).mockClear();
  });

  it('should send status 200 and a task list', async () => {
    await taskController.getAll(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeTaskList);
    expect(next).not.toHaveBeenCalled();
  });
});
