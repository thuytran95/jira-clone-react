import React from 'react';
import { Modal } from 'react-bootstrap';
import './issue-modal.scss';

const IssueModal = () => {
  return (
    <Modal show={true} className="issue__modal">
      <Modal.Header className="issue__modal__header">
        <div className="flex items-center">
          <span className="issue__icon story-icon">
            <i className="fa fa-bookmark"></i>
          </span>
          <span className="uppercase font-semibold text-textMedium text-sm">story 2021</span>
        </div>
        <div className="issue__modal__action ml-auto">
          <button className='issue__modal__btn'>
            <i className="fa fa-trash"></i>
          </button>
          <button  className='issue__modal__btn'>
            <i className="fa fa-expand-arrows-alt"></i>
          </button>
          <button  className='issue__modal__btn'>
            <i className="fa fa-times"></i>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className='col-8'>
          <h3>Angular Sportify</h3>
          <div>Description</div>
          <div></div>
        </div>
        <div className='col-4'></div>
      </Modal.Body>
    </Modal>
  );
};

export default IssueModal;
