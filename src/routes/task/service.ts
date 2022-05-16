import { PrismaClient } from '@prisma/client';
import { ITask } from '../../interfaces';

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
}
