import { IssueCard } from 'components/issues';
import { DragItem } from 'components/issues/issue-card/IssueCard';
import { Issue, IssueDropTypes, IssueStatusDisplay, IssueStatusType } from 'interface/issue';
import { useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { UpdateHoverIssuePayload, updateHoverIssues } from 'redux-utils/issue/issueSlice';
import { useAppDispatch } from 'store';
import './kanban-board-item.scss';

export interface KanbanBoardProps {
  issues: Issue[];
  status: IssueStatusType;
  handleShowIssue: (issue: Issue) => void;
}

const KanbanBoad = ({ issues, status, handleShowIssue }: KanbanBoardProps) => {
  const [issueItems, setIssueItems] = useState<Issue[]>([]);
  const dispatch = useAppDispatch();
  const [, drop] = useDrop(() => ({
    accept: IssueDropTypes.ISSUE,
    drop: () => ({ name: status }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    hover: (item) => {
      const itemCollect = item as DragItem;
      if (itemCollect.issue && itemCollect.status !== itemCollect.issue.status) {
        const params = {
          status: itemCollect.status,
          nextStatus: itemCollect.issue.status,
          id: itemCollect.id,
          index: itemCollect.index
        } as UpdateHoverIssuePayload;

        dispatch(updateHoverIssues(params));
      }
    }
  }));

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
        if (issue) {
          return (
            <IssueCard
              key={issue.id}
              issue={issue}
              index={index}
              moveIssueCard={moveIssueCard}
              status={status}
              handleShowIssue={handleShowIssue}
            />
          );
        }
      })}
    </div>
  );
};

export default KanbanBoad;
