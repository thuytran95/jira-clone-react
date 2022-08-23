import { IssueModal } from 'components/issues';
import { ModalHandle } from 'components/issues/issue-modal/IssueModal';
import KanbanBoard from 'components/kanban-board/KanbanBoard';
import { Issue, IssueStatusType, IssueType } from 'interface/issue';
import { IssueTypeIcon } from 'interface/issue-type-icon';
import { User } from 'interface/user';
import { useEffect, useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { editIssue, getIssues } from 'redux-utils/issue/issueSlice';
import { useAppDispatch, useAppSelector } from 'store';
import { IssueUtils } from 'utils/issue';
import './kanban.scss';

export interface IssueWithIcon extends Issue {
  typeIcon: IssueTypeIcon;
}

const filterIssues = (userId = '', userIds: string[] = [], issueList: Issue[] = []) => {
  if (userId && !userIds.length) {
    return issueList.filter((issue: Issue) => issue.userIds.includes(userId));
  } else if (userId && userIds.length) {
    return issueList.filter(
      (issue: Issue) =>
        issue.userIds.includes(userId) && issue.userIds.some((id) => userIds.includes(id))
    );
  } else if (userIds.length) {
    return issueList.filter((issue: Issue) => {
      return issue.userIds.some((id) => userIds.includes(id));
    });
  }

  return issueList;
};

const Kanban = () => {
  const { project } = useAppSelector((state) => state.project);
  const { user } = useAppSelector((state) => state.auth);
  const [userFilter, setUserFilter] = useState<string>('');
  const [multipleFilter, setMultipleFilter] = useState<string[]>([]);
  const [ignoreResolve, setIgnoreResolve] = useState<boolean>(false);

  const { doneIssues, selectedIssues, inProgressIssues, backlogIssues } = useAppSelector(
    (state) => state.issue
  );
  const dispatch = useAppDispatch();
  const modalIssue = useRef<ModalHandle>(null);

  const handleShowIssue = (issue: Issue) => {
    const type = issue.type as IssueType;
    const typeIcon = IssueUtils.getIssueTypeIcon(type);
    const newIssue = { ...issue, typeIcon };
    dispatch(editIssue({ issue: newIssue }));
  };

  const handleFilterByCurrentUser = () => {
    const newFilter = userFilter ? '' : user.id;
    setUserFilter(newFilter);
  };

  const handleFilterByMultipleUsers = (user: User) => {
    const isExist = multipleFilter.includes(user.id);

    if (isExist) {
      setMultipleFilter((prev) => prev.filter((id: string) => id !== user.id));
    } else {
      setMultipleFilter([...multipleFilter, user.id]);
    }
  };

  const handleIgnoreResolve = () => {
    setIgnoreResolve((prevState) => !prevState);
  };

  const clearAllFilter = () => {
    setMultipleFilter([]);
    setUserFilter('');
    setIgnoreResolve(false);
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
                className={`avatar base-tooltip ${
                  multipleFilter.includes(user.id) ? 'selected' : 'none'
                }`}
                data-content={user.name}
                style={{ backgroundImage: `url(${user.avatarUrl})` }}
                onClick={() => handleFilterByMultipleUsers(user)}
              ></div>
            ))}
          </div>

          <button
            className={`kanban__btn flex-shrink-0 text-textMedium p-2 hover:bg-backgroundLight rounded-sm mx-4 h-[2rem] leading-none ${
              userFilter ? 'active' : ''
            }`}
            onClick={handleFilterByCurrentUser}
          >
            Only my issue
          </button>
          <button
            className={`kanban__btn flex-shrink-0 text-textMedium p-2 hover:bg-backgroundLight h-[2rem] leading-none mr-4 ${
              ignoreResolve ? 'active' : ''
            }`}
            onClick={handleIgnoreResolve}
          >
            Ignore Resolved
          </button>
          {userFilter || ignoreResolve || multipleFilter.length ? (
            <button
              className="kanban__btn flex-shrink-0 text-textMedium p-2 hover:bg-backgroundLight h-[2rem] leading-none"
              onClick={clearAllFilter}
            >
              Clear all
            </button>
          ) : null}
        </div>
      </div>

      <div className="kanban__board flex mt-7">
        <DndProvider backend={HTML5Backend}>
          <KanbanBoard
            status={IssueStatusType.BACKLOG}
            issues={filterIssues(userFilter, multipleFilter, backlogIssues)}
            handleShowIssue={handleShowIssue}
          />
          <KanbanBoard
            status={IssueStatusType.SELECTED}
            issues={filterIssues(userFilter, multipleFilter, selectedIssues)}
            handleShowIssue={handleShowIssue}
          />
          <KanbanBoard
            status={IssueStatusType.IN_PROGRESS}
            issues={filterIssues(userFilter, multipleFilter, inProgressIssues)}
            handleShowIssue={handleShowIssue}
          />
          <KanbanBoard
            status={IssueStatusType.DONE}
            issues={ignoreResolve ? [] : filterIssues(userFilter, multipleFilter, doneIssues)}
            handleShowIssue={handleShowIssue}
          />
        </DndProvider>
      </div>

      <IssueModal ref={modalIssue} />
    </div>
  );
};

export default Kanban;
