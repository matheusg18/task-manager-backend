import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { ITask, ITaskUpdateRequest } from '../../../../../src/interfaces';
import TaskController from '../../../../../src/routes/task/controller';
import TaskService from '../../../../../src/routes/task/service';

jest.mock('../../../../../src/routes/task/service');

const mockService = new TaskService({} as PrismaClient);
const taskController = new TaskController(mockService);

const fakeTask: ITask = {
  id: '23457e31-277e-48b0-bc47-607c4fabb942',
  content: 'fake task',
  status: 'PENDING',
  createdAt: new Date(),
};

const fakeUpdate = {
  id: '23457e31-277e-48b0-bc47-607c4fabb942',
  body: {
    content: 'fake task',
  },
};

describe('TaskController update - unit test', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = jest.fn();

  beforeAll(() => {
    req.params = { id: fakeUpdate.id };
    req.body = { content: fakeUpdate.body.content } as ITaskUpdateRequest;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    mockService.update = jest.fn().mockResolvedValue(fakeTask);
  });

  afterAll(() => {
    (TaskService as jest.Mock).mockClear();
  });

  it('should send status 200 and the updated task', async () => {
    await taskController.update(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeTask);
    expect(next).not.toHaveBeenCalled();
  });
});
