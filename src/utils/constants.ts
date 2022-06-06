import {
  IssuePriority,
  IssuePriorityColors,
  IssueStatusDisplay,
  IssueStatusWithTitle
} from 'interface/issue';
import { IssuePriorityIcon } from 'interface/issue-priority-icon';
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
