import { Issue, IssueDropTypes, IssuePriority, IssueStatusType } from 'interface/issue';
import { User } from 'interface/user';
import { memo, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from 'store';
import { IssueUtils } from 'utils/issue';
import type { Identifier } from 'dnd-core';
import './issue-card.scss';
import { updateIssues, UpdateIssuesPayload } from 'redux-utils/issue/issueSlice';

interface IssueCardProps {
  issue: Issue;
  index: number;
  moveIssueCard: (dragIndex: number, hoverIndex: number) => void;
  findIssueCard: (id: string) => { index: number };
  status: IssueStatusType;
}

export interface DragItem {
  index: number;
  id: string;
  type: string;
  issue: Issue;
  hoverIndex: number;
}

const IssueCard = ({ issue, index, moveIssueCard, status }: IssueCardProps) => {
  const [members, setMembers] = useState<User[]>([]);
  const { project } = useAppSelector((state) => state.project);
  const priority = issue.priority as IssuePriority;
  const isuePriorityIcon = IssueUtils.getIssuePriorityIcon(priority);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: IssueDropTypes.ISSUE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves

      const isDifferentStatus = status !== issue.status;

      if (isDifferentStatus) {
        const params = {
          status: status,
          issue,
          hoverIndex
        } as UpdateIssuesPayload;

        dispatch(updateIssues(params));
      } else if (dragIndex !== hoverIndex && !isDifferentStatus) {
        moveIssueCard(dragIndex, hoverIndex);
      } else {
        return;
      }

      item.index = hoverIndex;
      item.issue = issue;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: IssueDropTypes.ISSUE,
    item: () => {
      return { id: issue.id, index, issue: issue };
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<any>();
      const { issue } = item;
      if (issue && dropResult && dropResult.name && issue.status !== dropResult.name) {
        const params = {
          status: dropResult.name,
          issue,
          hoverIndex: item.index
        } as UpdateIssuesPayload;
        dispatch(updateIssues(params));
      }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  useEffect(() => {
    const listUser = project.users.filter((user) => issue.userIds.includes(user.id)) as User[];
    setMembers(listUser);
  }, [issue]);

  const opacity = isDragging ? 0 : 1;
  if (issue) {
    drag(drop(ref));

    return (
      <div className="issue__card" ref={ref} data-handler-id={handlerId} style={{ opacity }}>
        <div className="issue__card__title">{issue.title}</div>
        <div className="flex items-center">
          {members.slice(0, 3).map((member) => (
            <div
              key={issue.id + member.id}
              className="issue__avatar issue__avatar--w24"
              style={{ backgroundImage: `url(${member.avatarUrl})` }}
            ></div>
          ))}
          <span className="issue__category uppercase ml-3 text-sm">{`${issue.type} - ${issue.id}`}</span>
          <div className="flex items-center ml-auto">
            <span className="issue__icon story-icon base-tooltip" data-content="Story">
              <i className="fa fa-bookmark"></i>
            </span>

            <span
              className="issue__priority base-tooltip"
              data-content={issue.priority}
              style={{ color: isuePriorityIcon.color }}
            >
              <i className={isuePriorityIcon.icon}></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default memo(IssueCard);
