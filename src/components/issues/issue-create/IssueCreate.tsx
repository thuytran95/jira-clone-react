import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import { ISSUE_STATUS, ISSUE_TYPES } from 'utils/constants';
import './issue-create.scss';

interface IssueCreateProps {
  show: boolean;
  handleToggleModal: () => void;
}

console.log(ISSUE_TYPES);

const IssueCreate = ({ show, handleToggleModal }: IssueCreateProps) => {
  return (
    <Modal className="issue__create" show={show} onHide={handleToggleModal}>
      <Modal.Body>
        <h5>Create issue</h5>
        <Form>
          <div className="settings__form__group flex flex-col mt-3">
            <label htmlFor="catergory" className="mb-2">
              Issue type
            </label>
            <Form.Select>
              {ISSUE_TYPES.map((type) => (
                <option key={type.value}>
                  <span>
                    {/* <span className="issue__icon story-icon">
                      <i className={type.icon}></i>
                    </span> */}
                    <span className="issue__icon story-icon">
                      <i className="fa fa-bookmark" aria-hidden="true"></i>
                    </span>
                    <span>{type.value}</span>
                  </span>
                </option>
              ))}
              <option value="Software">Software </option>
              <option value="Bussiness">Bussiness</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IssueCreate;
