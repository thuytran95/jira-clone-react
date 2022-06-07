import React from 'react';
import { Modal } from 'react-bootstrap';
import './issue-search.scss';

interface IssueSearchProps {
  show: boolean;
  handleToggleModal: () => void;
}

const issueList = [...new Array(5)].fill(1).map((item, index) => ({ id: index }));

const IssueSearch = ({ show, handleToggleModal }: IssueSearchProps) => {
  return (
    <Modal className="issue__search" show={show} onHide={handleToggleModal}>
      <Modal.Body className="p-6">
        <div className="issue__search__header text-textMedium mb-10">
          <input
            className="issue__search__input py-2 "
            placeholder="Search issue by summary, description..."
            autoFocus
          />
          <span className="issue__search__icon text-xl">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="recent__issues">
          <h4 className="uppercase text-textMedium font-bold text-xs mb-3">Recent issues</h4>
          <div className="recent__issues__list">
            {issueList.map((issue) => (
              <div key={issue.id} className="flex items-center px-3 py-1 hover:bg-backgroundLight cursor-pointer select-none ease-in duration-100">
                <span className="issue__icon story-icon">
                  <i className="fa fa-bookmark" aria-hidden="true"></i>
                </span>
                <div className="pl-4">
                  <div className="text-textDark text-15">Jira clone</div>
                  <span className="uppercase text-xs text-textMedium">Story-21</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IssueSearch;
