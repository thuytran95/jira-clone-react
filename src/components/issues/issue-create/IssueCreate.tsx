import React from 'react';
import { Form, Modal } from 'react-bootstrap';
import './issue-create.scss';

interface IssueCreateProps {
  show: boolean;
  handleToggleModal: () => void;
}
const IssueCreate = ({ show, handleToggleModal }: IssueCreateProps) => {
  return (
    <Modal className="issue__create" show={show}>
      <Modal.Body>
        <h5>Create issue</h5>
        <Form>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default IssueCreate;
