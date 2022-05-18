import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { NotFound } from '../../http-errors';
import { ITask, ITaskUpdateRequest } from '../../interfaces';

export default class TaskService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<ITask[]> {
    return this.prisma.task.findMany();
  }

  public async create(content: string): Promise<ITask> {
    return this.prisma.task.create({ data: { content } });
  }

  public async update(id: string, payload: ITaskUpdateRequest): Promise<ITask | undefined> {
    const { content, status } = payload;

    try {
      const updatedTask = await this.prisma.task.update({
        data: { content, status },
        where: { id },
      });

      return updatedTask;
    } catch (error) {
      this.dealPrismaError(error);
    }
  }

  public async exclude(id: string): Promise<void> {
    try {
      await this.prisma.task.delete({ where: { id } });
    } catch (error) {
      this.dealPrismaError(error);
    }
  }

  private dealPrismaError(error: any) {
    const PRISMA_UNKNOWN_RECORD_ERROR_CODE = 'P2025';

    if (
      error instanceof PrismaClientKnownRequestError
      && error.code === PRISMA_UNKNOWN_RECORD_ERROR_CODE
    ) {
      throw new NotFound('task not found');
    } else throw error;
  }
}
