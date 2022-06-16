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
}

const KanbanBoad = ({ issues, status }: KanbanBoardProps) => {
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
      console.log(item);
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
    // console.log('movecard')
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
              findIssueCard={findIssueCard}
              moveIssueCard={moveIssueCard}
              status={status}
            />
          );
        }
      })}
    </div>
  );
};

export default KanbanBoad;
