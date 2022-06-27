import { IssueStatusDisplay, IssueStatusType, IssueStatusWithTitle } from 'interface/issue';
import { IssueWithIcon } from 'pages/kanban/Kanban';
import { Dropdown } from 'react-bootstrap';
import { ISSUE_STATUS } from 'utils/constants';

interface IssueStatusProps {
  issue: IssueWithIcon;
  handleChangeIssue: (issue: IssueWithIcon) => void;
}

const IssueStatus = ({ issue, handleChangeIssue }: IssueStatusProps) => {
  const status = issue.status as IssueStatusType;

  const handleChangeStatus = (status: IssueStatusWithTitle) => {
    const newStatus = status.value as IssueStatusType;
    handleChangeIssue({ ...issue, status: newStatus });
    // setCurrentStatus(newStatus);
  };

  return (
    <div className="status">
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">Status</div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-backgroundMedium bg-[#f4f5f7] focus:bg-backgroundMedium">
          <span className="uppercase text-13 text-textMedium">{IssueStatusDisplay[status]}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {ISSUE_STATUS.map((issueStatus) => {
            if (issueStatus.value !== status) {
              return (
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => handleChangeStatus(issueStatus)}
                  key={issueStatus.value}
                >
                  <span className="uppercase text-13 text-textMedium">{issueStatus.title} </span>
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

export default IssueStatus;
