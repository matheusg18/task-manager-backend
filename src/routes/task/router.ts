import TaskController from './controller';

export default class TaskRouter {
  private readonly taskController: TaskController;

  constructor(taskController: TaskController) {
    this.taskController = taskController;
  }
}
