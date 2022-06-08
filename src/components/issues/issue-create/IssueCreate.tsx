import classNames from 'classnames';
import { EditorState } from 'draft-js';
import { IssuePriority,IssueType } from 'interface/issue';
import { IssuePriorityIcon } from 'interface/issue-priority-icon';
import { IssueTypeIcon } from 'interface/issue-type-icon';
import React,{ useState } from 'react';
import { Dropdown,Form,Modal } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { ISSUE_TYPES,PROJECT_ISSUE_PRIORITIES } from 'utils/constants';
import './issue-create.scss';

interface IssueCreateProps {
  show: boolean;
  handleToggleModal: () => void;
}

const initIssueType = new IssueTypeIcon(IssueType.TASK);
const initPriority = new IssuePriorityIcon(IssuePriority.MEDIUM);

const IssueCreate = ({ show, handleToggleModal }: IssueCreateProps) => {
  const [issueType, setIssueType] = useState<IssueTypeIcon>(initIssueType);
  const [currentPriority, setCurrentPriority] = useState<IssuePriorityIcon>(initPriority);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChangePriority = (priority: IssuePriorityIcon) => {
    if (currentPriority.value !== priority.value) {
      setCurrentPriority(priority);
    }
  };

  const handleChangeIssueType = (issue: IssueTypeIcon) => {
    if (issue.value !== issueType.value) {
      setIssueType(issue);
    }
  };

  console.log(issueType);

  return (
    <Modal className="issue__create" show={show} onHide={handleToggleModal} size='lg'>
      <Modal.Body className="py-5 px-8">
        <h5 className="text-xl">Create issue</h5>
        <Form>
          <div className="settings__form__group flex flex-col mt-3">
            <label htmlFor="catergory" className="mb-2">
              Issue type
            </label>
            <Dropdown>
              <Dropdown.Toggle className="flex items-center w-100 justify-start text-textMedium uppercase px-3 py-2">
                <span
                  className="issue__icon text-white rounded"
                  style={{ backgroundColor: issueType.color }}
                >
                  <i className={issueType.icon}></i>
                </span>
                <span>{issueType.value}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {ISSUE_TYPES.map((type) => (
                  <Dropdown.Item
                    className={classNames('flex uppercase items-center', {
                      active: type.value === issueType.value
                    })}
                    key={type.value}
                    onClick={() => handleChangeIssueType(type)}
                  >
                    <span
                      className="issue__icon text-white rounded flex items-center justify-center"
                      style={{ backgroundColor: type.color }}
                    >
                      <i className={type.icon}></i>
                    </span>
                    <span>{type.value}</span>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="settings__form__group mt-3">
            <label htmlFor="priority" className="mb-2">
              Priority
            </label>
            <Dropdown>
              <Dropdown.Toggle className="justify-start hover:bg-backgroundMedium bg-[#f4f5f7] focus:bg-backgroundMedium w-100 px-3 py-2">
                <span
                  className="issue__priority__option mr-2"
                  style={{ color: currentPriority.color }}
                >
                  <i className={currentPriority.icon}></i>
                </span>
                <span className="uppercase text-13 text-textMedium">{currentPriority.value}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {PROJECT_ISSUE_PRIORITIES.map((issue) => {
                  return (
                    <Dropdown.Item
                      href="#/action-1"
                      key={issue.value}
                      className={classNames({ active: issue.value === currentPriority.value })}
                      onClick={() => handleChangePriority(issue)}
                    >
                      <span
                        className={`issue__priority__option mr-2`}
                        style={{ color: issue.color }}
                      >
                        <i className={issue.icon}></i>
                      </span>
                      <span className="uppercase text-13 text-textMedium">{issue.value}</span>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="settings__form__group flex flex-col mt-3">
            <label htmlFor="summary" className="mb-2">
              Short summary
            </label>
            <input className="border-input px-3 py-2 text-13" name="summary" type="text" />
          </div>

          <div className="settings__form__group flex flex-col mt-3">
            <label htmlFor="description" className="mb-2">
              Description
            </label>
            <Editor
              editorState={editorState}
              // onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IssueCreate;
