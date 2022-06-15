import { IssueCard } from 'components/issues';
import { Issue, IssueDropTypes, IssueStatusDisplay, IssueStatusType } from 'interface/issue';
import React, { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import './kanban-board-item.scss';

export interface KanbanBoardProps {
  issues: Issue[];
  status: IssueStatusType;
}

const KanbanBoad = ({ issues, status }: KanbanBoardProps) => {
  const [issueItems, setIssueItems] = useState<Issue[]>([]);
  const [, drop] = useDrop(() => ({
    accept: IssueDropTypes.ISSUE,
    drop: () => ({ name: status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }));

  const findIssueCard = useCallback(
    (id: string) => {
      const index = issues.findIndex((issue) => issue.id === id);
      return {
        issue: issues[index],
        index: index
      };
    },
    [issues]
  );

  const moveIssueCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setIssueItems((prevIssues: Issue[]) => {
      const newIssues = [...prevIssues];
      const prevIssue = { ...prevIssues[hoverIndex] };

      newIssues[hoverIndex] = prevIssues[dragIndex];
      newIssues[dragIndex] = prevIssue;
      return newIssues;
    });
  }, []);

  useEffect(() => {
    setIssueItems(issues);
  }, [issues]);

  return (
    <div className="kanban__board__item" ref={drop}>
      <h5 className="kanban__board__title">{`${IssueStatusDisplay[status]} ${issues.length}`}</h5>
      {issueItems?.map((issue, index) => {
        return (
          <IssueCard
            key={issue.id}
            issue={issue}
            index={index}
            findIssueCard={findIssueCard}
            moveIssueCard={moveIssueCard}
          />
        );
      })}
    </div>
  );
};

export default KanbanBoad;
