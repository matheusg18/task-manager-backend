import { Router } from 'express';
import prisma from './database/prisma';
import TaskController from './routes/task/controller';
import TaskRouter from './routes/task/router';
import TaskService from './routes/task/service';

export default class Factory {
  public static getTaskRouter(): Router {
    const taskService = new TaskService(prisma);
    const taskController = new TaskController(taskService);
    const taskRouter = new TaskRouter(taskController);

    return taskRouter.router;
  }
}
