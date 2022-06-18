import { IssuePriorityIcon } from 'interface/issue-priority-icon';
import { IssuePriority, IssueType } from 'interface/issue';
import { IssueTypeIcon } from 'interface/issue-type-icon';
export class IssueUtils {
  static getIssuePriorityIcon(priority: IssuePriority): IssuePriorityIcon {
    return new IssuePriorityIcon(priority);
  }

  static getIssueTypeIcon(type: IssueType): IssueTypeIcon {
    return new IssueTypeIcon(type);
  }
}
