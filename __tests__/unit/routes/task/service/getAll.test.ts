import TaskService from '../../../../../src/routes/task/service';
import prisma from '../../../../../src/database/prisma';
import { ITask } from '../../../../../src/interfaces';

const mockPrisma = jest.spyOn(prisma.task, 'findMany');
const taskService = new TaskService(prisma);

const fakeTaskList: ITask[] = [
  {
    id: '12345abcde',
    content: 'fake task',
    status: 'PENDING',
    createdAt: new Date(),
  },
];

describe('TaskService getAll - unit test', () => {
  beforeAll(() => {
    mockPrisma.mockResolvedValue(fakeTaskList as ITask[]);
  });

  afterAll(() => {
    mockPrisma.mockReset();
  });

  it('should return a task list', async () => {
    const result = await taskService.getAll();

    expect(result).toStrictEqual(fakeTaskList);
  });
});
