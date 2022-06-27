import { User } from 'interface/user';
import { IssueWithIcon } from 'pages/kanban/Kanban';
import { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { updateIssue } from 'redux-utils/issue/issueSlice';
import { useAppDispatch, useAppSelector } from 'store';

interface IssueReporterProps {
  issue: IssueWithIcon;
  handleChangeIssue: (issue: IssueWithIcon) => void;
}

const IssueReporter = ({ issue, handleChangeIssue }: IssueReporterProps) => {
  const { project } = useAppSelector((state) => state.project);
  const { users } = project;
  const [reporter, setReporter] = useState<User | null>(null);

  useEffect(() => {
    const currentReporter = users?.find((user) => user.id === issue.reporterId) || null;
    setReporter(currentReporter);
  }, [project, issue]);

  const handleChangeReporter = (user: User) => {
    setReporter(user);
    handleChangeIssue({ ...issue, reporterId: user.id });
  };

  return (
    <div className="status">
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">Reporter</div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-backgroundMedium bg-[#f4f5f7] focus:bg-backgroundMedium">
          <span className="flex items-center">
            <span
              className="issue__avatar issue__avatar--w20 mr-2"
              style={{ backgroundImage: `url(${reporter?.avatarUrl})` }}
            ></span>
            <span className="text-textMedium text-sm">{reporter?.name}</span>
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {users.map((user) => {
            if (user.id !== reporter?.id) {
              return (
                <Dropdown.Item key={user.id} onClick={() => handleChangeReporter(user)}>
                  <span className="flex items-center">
                    <span
                      className="issue__avatar issue__avatar--w20 mr-2"
                      style={{ backgroundImage: `url(${user.avatarUrl})` }}
                    ></span>
                    <span className="text-textMedium text-sm">{user.name}</span>
                  </span>
                </Dropdown.Item>
              );
            }

            return null;
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default IssueReporter;
