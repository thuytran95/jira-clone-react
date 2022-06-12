import { Issue } from 'interface/issue';
import { User } from 'interface/user';
import { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useAppSelector } from 'store';
import './issue-card.scss';

interface DropResult {
  name: string;
}

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const { project } = useAppSelector((state) => state.project);
  const [members, setMembers] = useState<User[]>([]);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'issue',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }));

  useEffect(() => {
    const listUser = project.users.filter((user) => issue.userIds.includes(user.id)) as User[];
    setMembers(listUser);
  }, [issue]);

  return (
    <div className="issue__card" ref={drag}>
      <div className="issue__card__title">{issue.title}</div>
      <div className="flex items-center">
        {members.slice(0, 3).map((member) => (
          <div
            key={issue.id + member.id}
            className="issue__avatar issue__avatar--w24"
            style={{ backgroundImage: `url(${member.avatarUrl})` }}
          ></div>
        ))}
        <span className="issue__category uppercase ml-3 text-sm">{`${issue.status} - ${issue.id}`}</span>
        <div className="flex items-center ml-auto">
          <span className="issue__icon story-icon base-tooltip" data-content="Story">
            <i className="fa fa-bookmark"></i>
          </span>

          <span className="issue__priority base-tooltip" data-content="Highest">
            <i className="fa fa-arrow-up"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
