import { IssueCard } from 'components/issues';
import { Issue, IssueStatusType } from 'interface/issue';
import React from 'react';
import { useDrop } from 'react-dnd';
import './kanban-board-item.scss';

export interface KanbanBoardProps {
  issues: Issue[];
  status: IssueStatusType;
}

const KanbanBoad = ({ issues, status }: KanbanBoardProps) => {
  console.log(issues);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'issue',
    drop: () => ({ name: 'kanban-board' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  return (
    <div className="kanban__board__item" ref={drop}>
      <h5 className="kanban__board__title">Back log</h5>
      {issues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default KanbanBoad;
