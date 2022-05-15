import { PrismaClient } from '@prisma/client';

export default class TaskService {
  private readonly prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll() {
    return this.prisma.task.findMany();
  }
}
