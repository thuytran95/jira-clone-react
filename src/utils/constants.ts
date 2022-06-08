import {
  IssuePriority,
  IssuePriorityColors,
  IssueStatusDisplay,
  IssueStatusWithTitle,
  IssueType
} from 'interface/issue';
import { IssuePriorityIcon } from 'interface/issue-priority-icon';
import { IssueTypeClassIcon } from './../interface/issue';
import { IssueTypeIcon } from './../interface/issue-type-icon';
export const PROJECT_ISSUE_PRIORITIES = Object.keys(IssuePriorityColors).map((priority) => {
  const priorityType = priority as IssuePriority;
  return new IssuePriorityIcon(priorityType);
});

export const ISSUE_STATUS = Object.keys(IssueStatusDisplay).map((status) => {
  const statusValue = status as keyof typeof IssueStatusDisplay;
  return {
    value: status,
    title: IssueStatusDisplay[statusValue]
  } as IssueStatusWithTitle;
});

export const ISSUE_TYPES = Object.keys(IssueTypeClassIcon).map((type) => {
  const typeValue = type as IssueType;
  return new IssueTypeIcon(typeValue);
});
