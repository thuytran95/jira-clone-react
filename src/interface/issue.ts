export  enum IssueType {
  STORY = "Story",
  TASK = 'Task',
  BUG = 'Bug'
}

export enum IssueStatus {
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

export const IssueStatusDisplay = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for Development',
  [IssueStatus.IN_PROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done'
}
