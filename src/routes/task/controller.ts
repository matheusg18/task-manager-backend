import { RequestHandler } from 'express';
import TaskService from './service';

export default class TaskController {
  private readonly taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public getAll: RequestHandler = async (_req, res) => {
    const allTasks = await this.taskService.getAll();

    res.status(200).json(allTasks);
  };
}
