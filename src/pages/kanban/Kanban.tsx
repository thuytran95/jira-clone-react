import { IssueModal } from 'components/issues';
import { ModalHandle } from 'components/issues/issue-modal/IssueModal';
import KanbanBoad from 'components/kanban-board/KanbanBoad';
import { Issue, IssueStatusType, IssueType } from 'interface/issue';
import { IssueTypeIcon } from 'interface/issue-type-icon';
import { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIssues } from 'redux-utils/issue/issueSlice';
import { useAppDispatch, useAppSelector } from 'store';
import { IssueUtils } from 'utils/issue';
import './kanban.scss';

export interface IssueWithIcon extends Issue {
  typeIcon: IssueTypeIcon;
}

const Kanban = () => {
  const [showIssue, setShowIssue] = useState<IssueWithIcon | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const { project } = useAppSelector((state) => state.project);
  const { doneIssues, selectedIssues, inProgressIssues, backlogIssues } = useAppSelector(
    (state) => state.issue
  );
  const dispatch = useAppDispatch();
  const modalIssue = useRef<ModalHandle>(null);

  const handleShowIssue = (issue: Issue) => {
    const type = issue.type as IssueType;
    const typeIcon = IssueUtils.getIssueTypeIcon(type);
    setShowIssue({ ...issue, typeIcon });
    setShow(true);
  };

  const onHideModal = () => {
    setShow(false);
    setShowIssue(null);
  };

  useEffect(() => {
    dispatch(getIssues(project));
  }, []);

  return (
    <div className="kanban h-100">
      <div className="header">
        <h3 className="text-2xl font-medium text-textDark">Kanban board</h3>
        <div className="flex mt-6 items-center">
          <div className="search relative mr-4">
            <span className="search__icon absolute">
              <i className="fa fa-search"></i>
            </span>
            <input
              className="search__input grow-default hover:bg-backgroundLight focus:bg-white"
              type="text"
            />
          </div>

          <div className="avatar-group flex">
            {project.users.map((user) => (
              <div
                key={user.id}
                className="avatar base-tooltip"
                data-content={user.name}
                style={{ backgroundImage: `url(${user.avatarUrl})` }}
              ></div>
            ))}
          </div>

          <button className="kanban__btn text-textMedium p-2 hover:bg-backgroundLight rounded-sm mx-4 h-[2rem] leading-none">
            Only my issue
          </button>
          <button className="kanban__btn text-textMedium p-2 hover:bg-backgroundLight h-[2rem] leading-none">
            Ignore Resolved
          </button>
        </div>
      </div>

      <div className="kanban__board flex mt-7">
        <DndProvider backend={HTML5Backend}>
          <KanbanBoad
            status={IssueStatusType.BACKLOG}
            issues={backlogIssues}
            handleShowIssue={handleShowIssue}
          />
          <KanbanBoad
            status={IssueStatusType.SELECTED}
            issues={selectedIssues}
            handleShowIssue={handleShowIssue}
          />
          <KanbanBoad
            status={IssueStatusType.IN_PROGRESS}
            issues={inProgressIssues}
            handleShowIssue={handleShowIssue}
          />
          <KanbanBoad
            status={IssueStatusType.DONE}
            issues={doneIssues}
            handleShowIssue={handleShowIssue}
          />
        </DndProvider>
      </div>

      <IssueModal showIssue={showIssue} ref={modalIssue} onHideModal={onHideModal} show={show}/>
    </div>
  );
};

export default Kanban;
