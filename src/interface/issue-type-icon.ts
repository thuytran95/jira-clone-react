import { IssueType, IssueTypeClassIcon, IssueTypeColors } from './issue';
export class IssueTypeIcon {
  value: string;
  icon: string;
  color: string;

  constructor(type: IssueType){
    this.value = type;
    this.color = IssueTypeColors[type];
    this.icon = IssueTypeClassIcon[type];
  }
}
