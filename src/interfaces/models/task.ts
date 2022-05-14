export interface ITask {
  id: string;
  content: string;
  createdAt: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
}
