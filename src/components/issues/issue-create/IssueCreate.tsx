import project from 'assets/data/project.json';
import classNames from 'classnames';
import { EditorState } from 'draft-js';
import { IssuePriority,IssueType } from 'interface/issue';
import { IssuePriorityIcon } from 'interface/issue-priority-icon';
import { IssueTypeIcon } from 'interface/issue-type-icon';
import { User } from 'interface/user';
import React,{ useState } from 'react';
import { Dropdown,Form,Modal } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import Select,{
  MultiValueGenericProps
} from 'react-select';
import { ISSUE_TYPES,PROJECT_ISSUE_PRIORITIES } from 'utils/constants';
import './issue-create.scss';

interface IssueCreateProps {
  show: boolean;
  handleToggleModal: () => void;
}

interface AssgineeOption extends User {
  label: string;
}

const MultiValueLabel = (props: MultiValueGenericProps<AssgineeOption>) => {
  return (
    <div className="flex px-1 py-1">
      <span
        className="issue__avatar issue__avatar--w20 mr-2 shrink-0"
        style={{ backgroundImage: `url("${props.data.avatarUrl}")` }}
      ></span>
      <span className="text-textMedium text-sm">{props.data.name}</span>
    </div>
  );
};

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

  const projectUsers = project.users.map((user) => ({ ...user, label: user.name }));
  return (
    <Modal className="issue__create__modal" show={show} onHide={handleToggleModal} size="lg">
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

          <div className="settings__form__grsoup flex flex-col mt-3">
            <label htmlFor="description" className="mb-2">
              Reporter
            </label>
            <Dropdown>
              <Dropdown.Toggle className="w-100 justify-start">
                <span className="flex items-center">
                  <span
                    className="issue__avatar issue__avatar--w20 mr-2"
                    style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
                  ></span>
                  <span className="text-textMedium text-sm">Thuy Tran</span>
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
          </div>
          <div className="settings__form__group flex flex-col mt-3">
            <label htmlFor="description" className="mb-2">
              Assignee
            </label>
            <Select
              options={projectUsers}
              defaultValue={projectUsers[0]}
              isMulti
              styles={{
                multiValueRemove: (styles) => {
                  return {
                    ...styles,
                    ':hover': {
                      backgroundColor: 'inherite'
                    }
                  };
                },
                control: (styles) => ({
                  ...styles,
                  boxShadow: 'unset',
                  backgroundColor: 'transparent'
                })
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: '#40a9ff'
                }
              })}
              components={{
                Option: ({ ...props }) => {
                  return (
                    <div className=" react-select__option">
                      <span
                        className="issue__avatar issue__avatar--w20 mr-2 shrink-0"
                        style={{ backgroundImage: `url("${props.data.avatarUrl}")` }}
                      ></span>
                      <span className="text-textMedium text-sm">{props.data.name}</span>
                    </div>
                  );
                },
                // MultiValueLabel
              }}
            ></Select>
          </div>
          <div className="create__issue__btns mt-3 text-right">
            <button
              className="btn bg-textLink text-white px-3 py-2 font-medium hover:bg-[#0067ff]"
              type="submit"
            >
              Create issue
            </button>
            <button className="btn text-textDark px-3 py-2 ml-2">Cancel</button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IssueCreate;
