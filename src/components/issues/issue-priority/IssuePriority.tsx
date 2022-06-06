import { IssuePriority } from 'interface/issue';
import { IssuePriorityIcon } from 'interface/issue-priority-icon';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { PROJECT_ISSUE_PRIORITIES } from 'utils/constants';
import './issue-priority.scss';

const IssuePriorities = () => {
  const [currentPriority, setCurrentPriority] = useState<IssuePriorityIcon>(
    new IssuePriorityIcon(IssuePriority.HIGHEST)
  );

  const handleChangePriority = (priority: IssuePriorityIcon) => {
    setCurrentPriority(priority);
  };

  return (
    <div className="status">
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">PRIORITY</div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-backgroundMedium bg-[#f4f5f7] focus:bg-backgroundMedium">
          <span className="issue__priority__option mr-2" style={{ color: currentPriority.color }}>
            <i className={currentPriority.icon}></i>
          </span>
          <span className="uppercase text-13 text-textMedium">{currentPriority.value}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {PROJECT_ISSUE_PRIORITIES.map((issue) => {
            if (issue.value !== currentPriority.value) {
              return (
                <Dropdown.Item
                  href="#/action-1"
                  key={issue.value}
                  onClick={() => handleChangePriority(issue)}
                >
                  <span className={`issue__priority__option mr-2`} style={{ color: issue.color }}>
                    <i className={issue.icon}></i>
                  </span>
                  <span className="uppercase text-13 text-textMedium">{issue.value}</span>
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

export default IssuePriorities;