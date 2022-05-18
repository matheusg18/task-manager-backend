import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import TaskController from '../../../../../src/routes/task/controller';
import TaskService from '../../../../../src/routes/task/service';

jest.mock('../../../../../src/routes/task/service');

const mockService = new TaskService({} as PrismaClient);
const taskController = new TaskController(mockService);

const fakeId = '23457e31-277e-48b0-bc47-607c4fabb942';

describe('TaskController exclude - unit test', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = jest.fn();

  beforeAll(() => {
    req.params = { id: fakeId };

    res.status = jest.fn().mockReturnValue(res);
    res.end = jest.fn();

    mockService.exclude = jest.fn();
  });

  afterAll(() => {
    (TaskService as jest.Mock).mockClear();
  });

  it('should send status 204 with no body response', async () => {
    await taskController.exclude(req, res, next);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.end).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
    expect(mockService.exclude).toHaveBeenCalledWith(fakeId);
  });
});
