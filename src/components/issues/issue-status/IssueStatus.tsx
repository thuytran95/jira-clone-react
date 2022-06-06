import { IssueStatusDisplay, IssueStatusType, IssueStatusWithTitle } from 'interface/issue';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ISSUE_STATUS } from 'utils/constants';

const IssueStatus = () => {
  const [currentStatus, setCurrentStatus] = useState<IssueStatusType>(IssueStatusType.DONE);

  const handleChangeStatus = (status: IssueStatusWithTitle) => {
    const newStatus = status.value as IssueStatusType;
    setCurrentStatus(newStatus);
  }

  return (
    <div className="status">
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">Status</div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-backgroundMedium bg-[#f4f5f7] focus:bg-backgroundMedium">
          <span className="uppercase text-13 text-textMedium">{IssueStatusDisplay[currentStatus]}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {ISSUE_STATUS.map((issueStatus) => {
            if (issueStatus.value !== currentStatus) {
              return (
                <Dropdown.Item href="#/action-2" onClick={() => handleChangeStatus(issueStatus)} key={issueStatus.value}>
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
