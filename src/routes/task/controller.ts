import { RequestHandler } from 'express';
import { ITaskCreateRequest, ITaskUpdateRequest } from '../../interfaces';
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

  public create: RequestHandler = async (req, res) => {
    const { content } = req.body as ITaskCreateRequest;
    const newTask = await this.taskService.create(content);

    res.status(201).json(newTask);
  };

  public update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { content, status } = req.body as ITaskUpdateRequest;
    const updatedTask = await this.taskService.update(id, { content, status });

    res.status(200).json(updatedTask);
  };

  public exclude: RequestHandler = async (req, res) => {
    const { id } = req.params;
    await this.taskService.exclude(id);

    res.status(204).end();
  };
}
