import { User } from 'interface/user';
import { IssueWithIcon } from 'pages/kanban/Kanban';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useAppSelector } from 'store';

interface IssueAssigneeProps {
  issue: IssueWithIcon;
}

interface FilterUsers {
  members: User[];
  others: User[];
}

const IssueAssignee = ({ issue }: IssueAssigneeProps) => {
  const [members, setMembers] = useState<User[]>([]);
  const [others, setOthers] = useState<User[]>([]);
  const { project } = useAppSelector((state) => state.project);

  useEffect(() => {
    const filterUsers = project.users.reduce(
      (acc: FilterUsers, user) => {
        if (issue.userIds.includes(user.id)) acc.members.push(user);
        acc.others.push(user);
        return acc;
      },
      { members: [], others: [] }
    );

    setOthers(filterUsers.others);
    setMembers(filterUsers.members);
  }, [project, issue]);

  const addAssignee = (user: User) => {
    const newMembers = [...members, user] as User[];
    const newOthers = others.filter((member) => member.id !== user.id) as User[];
    setMembers(newMembers);
    setOthers(newOthers);
  };

  return (
    <>
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">ASSIGNEES</div>
      <div className="flex gap-2 flex-wrap">
        {members.map((member) => (
          <span
            className="flex items-center hover:bg-backgroundMedium bg-[#f4f5f7] p-1"
            key={member.id + issue.id}
          >
            <span
              className="issue__avatar issue__avatar--w20 mr-2"
              style={{ backgroundImage: `url(${member.avatarUrl})` }}
            ></span>
            <span className="text-textMedium text-sm">{member.name}</span>
          </span>
        ))}
      </div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-white bg-white focus:bg-white focus:text-primary">
          <span className="text-primary issue__modal__underline">
            + <span className="">Add assignee</span>
          </span>
        </Dropdown.Toggle>

        {others.length ? (
          <Dropdown.Menu>
            {others.map((member) => (
              <Dropdown.Item key={member.id} onClick={() => addAssignee(member)}>
                <span className="flex items-center">
                  <span
                    className="issue__avatar issue__avatar--w20 mr-2"
                    style={{ backgroundImage: `url(${member.avatarUrl})` }}
                  ></span>
                  <span className="text-textMedium text-sm">{member.name}</span>
                </span>
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        ) : null}
      </Dropdown>
    </>
  );
};

export default IssueAssignee;
