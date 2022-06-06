export enum IssueType {
  STORY = 'Story',
  TASK = 'Task',
  BUG = 'Bug'
}

export enum IssueStatusType {
  BACKLOG = 'Backlog',
  SELECTED = 'Selected',
  IN_PROGRESS = 'InProgress',
  DONE = 'Done'
}

export enum IssuePriority {
  LOWEST = 'Lowest',
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  HIGHEST = 'Highest'
}

export const IssuePriorityColors: { [priority: string]: string } = {
  [IssuePriority.HIGHEST]: '#CD1317',
  [IssuePriority.HIGH]: '#E9494A',
  [IssuePriority.MEDIUM]: '#E97F33',
  [IssuePriority.LOW]: '#2D8738',
  [IssuePriority.LOWEST]: '#57A55A'
};

export const IssueStatusDisplay = {
  [IssueStatusType.BACKLOG]: 'Backlog',
  [IssueStatusType.SELECTED]: 'Selected for Development',
  [IssueStatusType.IN_PROGRESS]: 'In progress',
  [IssueStatusType.DONE]: 'Done'
};

export interface Issue {
  id: string;
  description: string;
  priority: IssuePriority;
  reporterId: string;
  status: IssueStatusType;
  title: string;
  type: IssueType;
  userIds: string[];
  listPosition: number;
}

export interface IssueStatusWithTitle {
  value: IssueStatusType;
  title: string;
}