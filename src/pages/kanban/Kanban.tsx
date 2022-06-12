import { IssueModal } from 'components/issues';
import KanbanBoad from 'components/kanban-board/KanbanBoad';
import { Issue,IssueStatusType } from 'interface/issue';
import { useEffect,useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getIssues } from 'redux-utils/issue/issueSlice';
import { useAppDispatch,useAppSelector } from 'store';
import './kanban.scss';

const Kanban = () => {
  const [showIssue, setShowIssue] = useState<Issue | null>(null);
  const { project } = useAppSelector((state) => state.project);
  const { doneIssues, selectedIssues, inProgressIssues, backlogIssues } = useAppSelector(
    (state) => state.issue
  );
  const dispatch = useAppDispatch();

  const handleShowIssue = () => {
    const issue = {
      createdAt: '2020-08-27T14:23:38.183Z',
      description:
        "<p>I shared some of my technical decisions behind <a href='http://jira.trungk18.com' rel='noopener noreferrer' target='_blank'>jira.trungk18.com</a> on <a href='https://github.com/SingaporeJS/talk.js/issues/40' rel='noopener noreferrer' target='_blank'>Singapore talk.js August 2020</a> with a very catchy title - <strong>Behind the 900 stars repository 😂</strong> Do you like it? </p><p><br></p><p> Hopefully I can change the title to a thousand stars soon... 🤣</p><p><br></p><p>Thanks for having me!</p><p><br></p><p>See the </p><ul><li>Slide deck ➡ <a href='https://slides.com/tuantrungvo/behind-the-900-star-repository-jira-clone-angular' rel='noopener noreferrer' target='_blank' style='background-color: rgb(255, 255, 255);'>https://slides.com/tuantrungvo/behind-the-900-star-repository-jira-clone-angular</a></li><li><span style='background-color: rgb(255, 255, 255);'>Recorded talk:  </span><a href='https://youtu.be/X_beeihKk7o' rel='noopener noreferrer' target='_blank'>https://youtu.be/X_beeihKk7o</a></li></ul><p><br></p><p><img src='https://pbs.twimg.com/media/EgWe01qUcAIoNdi?format=jpg&amp;name=large' alt='Image'></p><p><br></p>",
      id: '6527',
      priority: 'Medium',
      reporterId: 'd65047e5-f4cf-4caa-9a38-6073dcbab7d1',
      status: 'Done',
      title: 'Behind the 900 stars - Update 08/2020',
      type: 'Story',
      updatedAt: '2020-08-27T14:23:38.183Z',
      userIds: ['d65047e5-f4cf-4caa-9a38-6073dcbab7d1'],
      listPosition: 1
    };
    setShowIssue(issue);
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
          <KanbanBoad status={IssueStatusType.BACKLOG} issues={backlogIssues} />
          <KanbanBoad status={IssueStatusType.SELECTED} issues={selectedIssues} />
          <KanbanBoad status={IssueStatusType.IN_PROGRESS} issues={inProgressIssues} />
          <KanbanBoad status={IssueStatusType.DONE} issues={doneIssues} />
        </DndProvider>
      </div>

      <IssueModal />
    </div>
  );
};

export default Kanban;
