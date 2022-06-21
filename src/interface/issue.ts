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

export const IssueTypeClassIcon = {
  [IssueType.BUG]: 'fa fa-dice-one',
  [IssueType.STORY]: 'fa fa-bookmark',
  [IssueType.TASK]: 'fa fa-check-square'
};

export const IssueTypeColors = {
  [IssueType.BUG]: '#E9494A',
  [IssueType.STORY]: '#57A55A',
  [IssueType.TASK]: '#4bade8'
};

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

export const IssuseTypeIcon = {
  [IssueType.BUG]: 'fa fa-dice-one',
  [IssueType.STORY]: 'fa fa-bookmark',
  [IssueType.TASK]: 'fa fa-check-square'
};

export interface Issue {
  id: string;
  description: string;
  priority: IssuePriority[keyof IssuePriority];
  reporterId: string;
  status: IssueStatusType[keyof IssueStatusType];
  title: string;
  type: IssueType[keyof IssueType];
  userIds: string[];
  listPosition: number;
  createdAt: string;
  updatedAt: string;
}

export interface IssueStatusWithTitle {
  value: IssueStatusType;
  title: string;
}

export interface IssueTypeWitfhIcon {
  value: IssueType;
  icon: string;
}

export const IssueDropTypes = {
  ISSUE: 'issue'
};
