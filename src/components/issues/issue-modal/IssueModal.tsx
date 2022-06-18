import { ContentState, convertFromHTML, EditorState } from 'draft-js';
import { IssueWithIcon } from 'pages/kanban/Kanban';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import IssueAssignee from '../issue-assignee/IssueAssignee';
import IssueComment from '../issue-comment/IssueComment';
import IssuePriority from '../issue-priority/IssuePriority';
import IssueReporter from '../issue-reporter/IssueReporter';
import IssueStatus from '../issue-status/IssueStatus';
import './issue-modal.scss';

export type ModalHandle = {
  handleShow: () => void;
};

interface ModalProps {
  ref: ModalHandle;
  showIssue: IssueWithIcon | null;
}

const IssueModal = ({ showIssue }: ModalProps, ref: React.Ref<ModalHandle>) => {
  const [editorState, setEditorState] = useState<EditorState>();
  const [show, setShow] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    handleShow: () => setShow(!show)
  }));

  const onHideModal = () => {
    setShow(false);
  };

  useEffect(() => {
    if (showIssue) {
      const blocksFromHTML = convertFromHTML(showIssue.description || '');
      const content = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      const state = EditorState.createWithContent(content);
      setEditorState(state);
    }
  }, [showIssue]);

  return (
    <Modal
      show={show}
      className="issue__modal"
      size="lg"
      dialogClassName="modal-90w"
      onHide={onHideModal}
    >
      <Modal.Header className="issue__modal__header">
        <div className="flex items-center">
          <span
            className="issue__icon story-icon"
            style={{ backgroundColor: showIssue?.typeIcon?.color }}
          >
            <i className={showIssue?.typeIcon?.icon}></i>
          </span>
          <span className="uppercase font-semibold text-textMedium text-sm">
            {showIssue?.typeIcon.value}
          </span>
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
            <h3 className="text-2xl font-semibold p-[7px] h-[42px] leading-tight">
              {showIssue?.title}
            </h3>
            <div className="pt-4 pb-2 text-15 font-medium">Description</div>
            <Editor
              editorState={editorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
            <IssueComment />
          </div>
          <div className="md-full lg:w-2/6">
            <IssueStatus />

            <IssueReporter />
            <div className="status">
              <IssueAssignee />
            </div>
            <IssuePriority />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default forwardRef<ModalHandle, ModalProps>(IssueModal);
