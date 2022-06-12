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
    drop: () => ({ name: 'kanban-board' }),
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

  const moveIssueCard = useCallback(
    (id: string, atIndex: number) => {
      // const { issue, index } = findIssueCard(id);
      // const newIssueItems = [...issueItems] as Issue[];

//       const prevIssue = newIssueItems[atIndex];
//       newIssueItems[atIndex] = issue;
//       newIssueItems[index] = prevIssue;
//
//       setIssueItems(newIssueItems);
    },
    [findIssueCard, issues, setIssueItems]
  );

  useEffect(() => {
    setIssueItems(issues);
  }, [issues]);

  return (
    <div className="kanban__board__item" ref={drop}>
      <h5 className="kanban__board__title">{`${IssueStatusDisplay[status]} ${issues.length}`}</h5>
      {issueItems?.map((issue) => {
        console.log(issue);
        if (issue) {
          return (
            <IssueCard
              key={issue.id}
              issue={issue}
              findIssueCard={findIssueCard}
              moveIssueCard={moveIssueCard}
            />
          );
        }
      })}
    </div>
  );
};

export default KanbanBoad;
