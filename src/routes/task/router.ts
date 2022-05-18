import { Router } from 'express';
import { validateParamsId, validateTaskCreate, validateTaskUpdate } from '../../middlewares';
import TaskController from './controller';

export default class TaskRouter {
  public router = Router();

  private readonly taskController: TaskController;

  constructor(taskController: TaskController) {
    this.taskController = taskController;

    this.init();
  }

  private init(): void {
    this.router.get('/', this.taskController.getAll);
    this.router.post('/', validateTaskCreate, this.taskController.create);
    this.router.patch('/:id', validateParamsId, validateTaskUpdate, this.taskController.update);
    this.router.delete('/:id', validateParamsId, this.taskController.exclude);
  }
}
