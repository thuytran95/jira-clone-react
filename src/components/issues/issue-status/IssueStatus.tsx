import React from 'react';
import { Dropdown } from 'react-bootstrap';

const IssueStatus = () => {
  return (
    <div className="status">
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">Status</div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-backgroundMedium bg-[#f4f5f7] focus:bg-backgroundMedium">
          <span className="uppercase text-13 text-textMedium">Backlog</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
            <span className="uppercase text-13 text-textMedium">Selected for Development</span>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
            <span className="uppercase text-13 text-textMedium"> In progress</span>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            <span className="uppercase text-13 text-textMedium"> Done</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default IssueStatus;
