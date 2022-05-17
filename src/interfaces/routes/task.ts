export interface ITaskCreateRequest {
  content: string;
}

export interface ITaskUpdateRequest {
  status?: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  content?: string;
}
