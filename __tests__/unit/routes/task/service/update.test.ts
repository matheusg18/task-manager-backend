import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import TaskService from '../../../../../src/routes/task/service';
import prisma from '../../../../../src/database/prisma';
import { ITask } from '../../../../../src/interfaces';
import { NotFound } from '../../../../../src/http-errors';

const mockPrisma = jest.spyOn(prisma.task, 'update');
const taskService = new TaskService(prisma);

const fakeTask: ITask = {
  id: '12345abcde',
  content: 'fake task',
  status: 'PENDING',
  createdAt: new Date(),
};

const fakeUpdate = {
  id: '12345abcde',
  payload: {
    content: 'fake task',
  },
};

describe('TaskService update - unit test', () => {
  describe('success', () => {
    beforeAll(() => {
      mockPrisma.mockResolvedValue(fakeTask as ITask);
    });

    afterAll(() => {
      mockPrisma.mockReset();
    });

    it('should return the updated task', async () => {
      const result = await taskService.update(fakeUpdate.id, fakeUpdate.payload);

      expect(result).toStrictEqual(fakeTask);
    });
  });

  describe('when there is not task with passed id', () => {
    beforeEach(() => {
      mockPrisma.mockRejectedValue(new PrismaClientKnownRequestError('', 'P2025', ''));
    });

    afterEach(() => {
      mockPrisma.mockReset();
    });

    it('should throw NotFound error', async () => {
      const result = taskService.update('incorrectid', fakeUpdate.payload);

      await expect(result).rejects.toStrictEqual(new NotFound('task not found'));
    });
  });

  describe('when an unexpected error is thrown', () => {
    beforeEach(() => {
      mockPrisma.mockRejectedValue(new Error('unexpected error'));
    });

    afterEach(() => {
      mockPrisma.mockReset();
    });

    it('should throw the error', async () => {
      const result = taskService.update(fakeUpdate.id, fakeUpdate.payload);

      await expect(result).rejects.toStrictEqual(new Error('unexpected error'));
    });
  });
});
