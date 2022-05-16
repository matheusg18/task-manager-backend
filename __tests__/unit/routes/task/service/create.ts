import TaskService from '../../../../../src/routes/task/service';
import prisma from '../../../../../src/database/prisma';
import { ITask } from '../../../../../src/interfaces';

const mockPrisma = jest.spyOn(prisma.task, 'create');
const taskService = new TaskService(prisma);

const fakeTask: ITask = {
  id: '12345abcde',
  content: 'fake task',
  status: 'PENDING',
  createdAt: new Date(),
};

describe('TaskService create - unit test', () => {
  beforeAll(() => {
    mockPrisma.mockResolvedValue(fakeTask as ITask);
  });

  afterAll(() => {
    mockPrisma.mockRestore();
  });

  it('should return the created task', async () => {
    const result = await taskService.create(fakeTask.content);

    expect(result).toStrictEqual(fakeTask);
  });
});
