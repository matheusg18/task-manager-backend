import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import TaskService from '../../../../../src/routes/task/service';
import prisma from '../../../../../src/database/prisma';
import { ITask } from '../../../../../src/interfaces';
import { NotFound } from '../../../../../src/http-errors';

const mockPrisma = jest.spyOn(prisma.task, 'delete');
const taskService = new TaskService(prisma);

const fakeTask: ITask = {
  id: '23457e31-277e-48b0-bc47-607c4fabb942',
  content: 'fake task',
  status: 'PENDING',
  createdAt: new Date(),
};

const fakeId = '23457e31-277e-48b0-bc47-607c4fabb942';

describe('TaskService exclude - unit test', () => {
  describe('success', () => {
    beforeAll(() => {
      mockPrisma.mockResolvedValue(fakeTask as ITask);
    });

    afterAll(() => {
      mockPrisma.mockReset();
    });

    it('should return nothing', async () => {
      const result = await taskService.exclude(fakeId);

      expect(result).toBeUndefined();
      expect(prisma.task.delete).toHaveBeenCalled();
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
      const result = taskService.exclude('incorrectid');

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
      const result = taskService.exclude('incorrectid');

      await expect(result).rejects.toStrictEqual(new Error('unexpected error'));
    });
  });
});
