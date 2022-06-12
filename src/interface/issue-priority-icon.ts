import { IssuePriority, IssuePriorityColors } from "./issue";

export class IssuePriorityIcon {
    value: string;
    icon: string;
    color: string;

    constructor (issuePriority: IssuePriority){

        const lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
        this.value = issuePriority;
        this.icon = lowerPriorities.includes(issuePriority) ? 'fa fa-arrow-down' : 'fa fa-arrow-up';
        this.color = IssuePriorityColors[issuePriority];
    }
}

