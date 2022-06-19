import { User } from 'interface/user';
import { IssueWithIcon } from 'pages/kanban/Kanban';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAppSelector } from 'store';

interface IssueReporterProps {
  issue: IssueWithIcon;
}

const IssueReporter = ({ issue }: IssueReporterProps) => {
  const { project } = useAppSelector((state) => state.project);
  const { users } = project;
  const [reporter, setReporter] = useState<User | null>(null);

  useEffect(() => {
    const currentReporter = users?.find((user) => user.id === issue.reporterId) || null;
    setReporter(currentReporter);
  }, [project, issue]);

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
                <Dropdown.Item key={user.id}>
                  <span className="flex items-center">
                    <span
                      className="issue__avatar issue__avatar--w20 mr-2"
                      style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
                    ></span>
                    <span className="text-textMedium text-sm">Thuy Tran</span>
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
