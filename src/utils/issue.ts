import { IssuePriorityIcon } from 'interface/issue-priority-icon';
import { IssuePriority } from 'interface/issue';
export class IssueUtils {
  static getIssuePriorityIcon(priority: IssuePriority): IssuePriorityIcon {
    return new IssuePriorityIcon(priority);
  }
}
