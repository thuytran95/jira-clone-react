import React from 'react';
import { Dropdown } from 'react-bootstrap';

const IssueAssignee = () => {
  return (
    <>
      <div className="text-textMedium text-sm uppercase font-bold mt-6 mb-1">ASSIGNEES</div>
      <Dropdown>
        <Dropdown.Toggle className="hover:bg-white bg-white focus:bg-white focus:text-primary">
          <span className="text-primary issue__modal__underline">
            + <span className="">Add assignee</span>
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
            <span className="flex items-center">
              <span
                className="issue__avatar issue__avatar--w20 mr-2"
                style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
              ></span>
              <span className="text-textMedium text-sm">Thuy Tran</span>
            </span>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
            <span className="flex items-center">
              <span
                className="issue__avatar issue__avatar--w20 mr-2"
                style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
              ></span>
              <span className="text-textMedium text-sm">Thuy Tran</span>
            </span>
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3">
            <span className="flex items-center">
              <span
                className="issue__avatar issue__avatar--w20 mr-2"
                style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
              ></span>
              <span className="text-textMedium text-sm">Thuy Tran</span>
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default IssueAssignee;
