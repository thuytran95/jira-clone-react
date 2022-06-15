import { Issue, IssueDropTypes, IssuePriority } from 'interface/issue';
import { User } from 'interface/user';
import { memo, useEffect, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from 'store';
import { IssueUtils } from 'utils/issue';
import type { Identifier, XYCoord } from 'dnd-core';
import './issue-card.scss';
import { updateIssues, UpdateIssuesPayload } from 'redux-utils/issue/issueSlice';

interface IssueCardProps {
  issue: Issue;
  index: number;
  moveIssueCard: (dragIndex: number, hoverIndex: number) => void;
  findIssueCard: (id: string) => { index: number };
}

interface DragItem {
  index: number;
  id: string;
  type: string;
  issue: Issue;
}

const IssueCard = ({ issue, index, moveIssueCard }: IssueCardProps) => {
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
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveIssueCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
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
      console.log(issue);
      if (issue && dropResult && dropResult.name && issue.status !== dropResult.name) {
        const params = { status: dropResult.name, issue } as UpdateIssuesPayload;
        dispatch(updateIssues(params));
        console.log('different');
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
