import React, { useState } from 'react';
import { Dropdown, Modal } from 'react-bootstrap';
import { ContentState, EditorState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import IssueAssignee from '../issue-assignee/IssueAssignee';
import './issue-modal.scss';

import project from 'assets/data/project.json';
import IssueStatus from '../issue-status/IssueStatus';
import IssueReporter from '../issue-reporter/IssueReporter';
import IssuePriority from '../issue-priority/IssuePriority';

const IssueModal = () => {
  const blocksFromHTML = convertFromHTML(project.issues[0].description);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = useState(EditorState.createWithContent(state));
  console.log(project.issues[0])

  return (
    <Modal show={true} className="issue__modal" size="lg" dialogClassName="modal-90w">
      <Modal.Header className="issue__modal__header">
        <div className="flex items-center">
          <span className="issue__icon story-icon">
            <i className="fa fa-bookmark"></i>
          </span>
          <span className="uppercase font-semibold text-textMedium text-sm">story 2021</span>
        </div>
        <div className="issue__modal__action ml-auto">
          <button className="issue__modal__btn">
            <i className="fa fa-trash"></i>
          </button>
          <button className="issue__modal__btn">
            <i className="fa fa-expand-arrows-alt"></i>
          </button>
          <button className="issue__modal__btn">
            <i className="fa fa-times"></i>
          </button>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex w-full flex-wrap pb-16">
          <div className="md:full lg:w-4/6 pr-10">
            <h3>Angular Sportify</h3>
            <div>Description</div>
            <Editor
              editorState={editorState}
              // onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
          <div className="md-full lg:w-2/6">
            <IssueStatus />

          <IssueReporter/>
            <div className="status">
              <IssueAssignee />
            </div>
            <IssuePriority/>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default IssueModal;
