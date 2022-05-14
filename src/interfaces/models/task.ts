export interface ITask {
  id: string;
  content: string;
  createdAt: Date;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}
