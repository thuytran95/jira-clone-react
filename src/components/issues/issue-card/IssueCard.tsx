import { Issue, IssueDropTypes, IssuePriority } from 'interface/issue';
import { User } from 'interface/user';
import { memo, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppSelector } from 'store';
import { IssueUtils } from 'utils/issue';
import './issue-card.scss';

interface DropResult {
  name: string;
}

interface IssueCardProps {
  issue: Issue;
  moveIssueCard: (id: string, to: number) => void;
  findIssueCard: (id: string) => { index: number };
}

interface Item {
  id: string;
  originalIndex: number;
}

const IssueCard = ({ issue, findIssueCard, moveIssueCard }: IssueCardProps) => {
  const { project } = useAppSelector((state) => state.project);
  const [members, setMembers] = useState<User[]>([]);
  const priority = issue.priority as IssuePriority;
  const isuePriorityIcon = IssueUtils.getIssuePriorityIcon(priority);

  const originalIndex = findIssueCard(issue?.id).index;


  const [, drag] = useDrag(
    () => ({
      type: IssueDropTypes.ISSUE,
      item: { id: issue?.id, originalIndex },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveIssueCard(droppedId, originalIndex);
        }
        // if (item && dropResult) {
        //   console.log('drop');
        //   // moveIssueCard()
        // }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId()
      })
    }),
    [issue, findIssueCard, moveIssueCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: IssueDropTypes.ISSUE,
      hover({ id: draggedId }: Item) {
        if (draggedId !== issue?.id) {
          const { index: overIndex } = findIssueCard(issue?.id);
          moveIssueCard(draggedId, overIndex);
        }
      }
    }),
    [issue, findIssueCard, moveIssueCard]
  );

  useEffect(() => {
    const listUser = project.users.filter((user) => issue.userIds.includes(user.id)) as User[];
    setMembers(listUser);
  }, [issue]);

  if (issue) {
    return (
      <div className="issue__card" ref={(node) => drag(drop(node))}>
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
