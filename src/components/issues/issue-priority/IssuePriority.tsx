import { IssuePriority, IssuePriorityColors } from 'interface/issue';
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './issue-priority.scss';

const IssuePriorities = () => {
  return (
    <div className="status">
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">Status</div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-backgroundMedium bg-[#f4f5f7] focus:bg-backgroundMedium">
          <span className="issue__priority mr-2">
            <i className="fa fa-arrow-up"></i>
          </span>
          <span className="uppercase text-13 text-textMedium">Backlog</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {Object.keys(IssuePriorityColors).map((priority: string) => {
            const color = IssuePriorityColors[priority] as string;
            return (
              <Dropdown.Item href="#/action-1" key={priority}>
                <span className={`issue__priority__option mr-2 text-[#57A55A] text-[${color}] `} style={{color: color}}>
                  {priority === IssuePriority.HIGHEST || priority === IssuePriority.HIGH ? (
                    <i className="fa fa-arrow-up"></i>
                  ) : (
                    <i className="fa fa-arrow-down"></i>
                  )}
                </span>
                <span className="uppercase text-13 text-textMedium">{priority}</span>
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default IssuePriorities;
