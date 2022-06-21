import { Issue, IssueType } from 'interface/issue';
import React, { useEffect, useState, useTransition } from 'react';
import { Modal } from 'react-bootstrap';
import { useAppSelector } from 'store';
import { IssueUtils } from 'utils/issue';
import './issue-search.scss';

interface IssueSearchProps {
  show: boolean;
  handleToggleModal: () => void;
}

const issueList = [...new Array(5)].fill(1).map((item, index) => ({ id: index }));

const IssueSearch = ({ show, handleToggleModal }: IssueSearchProps) => {
  const { project } = useAppSelector((state) => state.project);
  const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    const issues = [...project.issues].sort(
      (a: Issue, b: Issue) => new Date(b.updatedAt).valueOf() - new Date(a.createdAt).valueOf()
    );

    setRecentIssues(issues.slice(0, 4));
  }, [project]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    startTransition(() => {
      setInput(e.target.value.trim());
    });
  };

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <Modal className="issue__search" show={show} onHide={handleToggleModal}>
      <Modal.Body className="p-6">
        <div className="issue__search__header text-textMedium mb-10">
          <input
            className="issue__search__input py-2 "
            placeholder="Search issue by summary, description..."
            autoFocus
            onChange={handleSearch}
          />
          <span className="issue__search__icon text-xl">
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div className="recent__issues">
          <h4 className="uppercase text-textMedium font-bold text-xs mb-3">Recent issues</h4>
          <div className="recent__issues__list">
            {recentIssues.map((issue) => {
              const issueType = IssueUtils.getIssueTypeIcon(issue.type as IssueType);
              return (
                <div
                  key={issue.id}
                  className="flex items-center px-3 py-1 hover:bg-backgroundLight cursor-pointer select-none ease-in duration-100"
                >
                  <span
                    className="issue__icon story-icon flex-shrink-0"
                    style={{ backgroundColor: issueType.color }}
                  >
                    <i className={issueType.icon} aria-hidden="true"></i>
                  </span>
                  <div className="pl-4">
                    <div className="text-textDark text-15">{issue.title}</div>
                    <span className="uppercase text-xs text-textMedium">{issueType.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IssueSearch;
