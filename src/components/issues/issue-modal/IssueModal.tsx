import { IssueWithIcon } from 'pages/kanban/Kanban';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import ReactQuill from 'react-quill';

import {
  deleteIssue,
  DeleteIssuePayload,
  editIssue,
  updateIssue
} from 'redux-utils/issue/issueSlice';
import { useAppDispatch, useAppSelector } from 'store';
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
}

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['clean'] // remove formatting button
];

const modules = {
  toolbar: toolbarOptions
};

const IssueModal = (props: ModalProps, ref: React.Ref<ModalHandle>) => {
  const [description, setDescription] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const quillRef = useRef<ReactQuill | null>(null);
  const descriptionRef = useRef<string>('');
  const { showModal, issueEdit } = useAppSelector((state) => state.issue);
  const [currentIssue, setCurrentIssue] = useState<IssueWithIcon | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // useImperativeHandle(ref, () => ({
  //   handleShow: () => setShow(!show)
  // }));

  const handleChangeEditor = (html: string) => {
    descriptionRef.current = html;
  };

  const handleCancel = () => {
    setDescription(issueEdit?.description || '');
    setIsEdit(false);
  };

  const onSave = () => {
    if (currentIssue) {
      setIsEdit(false);
      setDescription(descriptionRef.current);
      setCurrentIssue({ ...currentIssue, description: descriptionRef.current });
    }
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const onHideModal = () => {
    if (issueEdit && currentIssue) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { typeIcon, ...remainIssue } = currentIssue;
      const newIssue = {
        ...remainIssue,
        ...(issueEdit.status !== currentIssue.status && { prevStatus: issueEdit.status })
      };

      dispatch(updateIssue(newIssue));
      dispatch(editIssue({ issue: null }));
    }
  };

  const handleChangeIssue = (issue: IssueWithIcon) => {
    setCurrentIssue(issue);
  };

  const toggleDeleteModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onDeleteIssue = () => {
    if (issueEdit) {
      const payload = { issue: issueEdit } as DeleteIssuePayload;
      dispatch(deleteIssue(payload));
    }
    toggleDeleteModal();
    dispatch(editIssue({ issue: null }));
  };

  useEffect(() => {
    if (issueEdit) {
      setDescription(issueEdit.description || '');
      setCurrentIssue(issueEdit);
    }
  }, [issueEdit]);

  return (
    <Modal
      show={showModal}
      className="issue__modal"
      size="lg"
      dialogClassName="modal-90w"
      onHide={onHideModal}
    >
      {currentIssue && (
        <>
          <Modal.Header className="issue__modal__header p-[24px]">
            <div className="flex items-center">
              <span
                className="issue__icon story-icon"
                style={{ backgroundColor: currentIssue?.typeIcon?.color }}
              >
                <i className={currentIssue?.typeIcon?.icon}></i>
              </span>
              <span className="uppercase font-semibold text-textMedium text-sm">
                {currentIssue?.typeIcon.value}
              </span>
            </div>
            <div className="issue__modal__action ml-auto">
              <button className="issue__modal__btn" onClick={toggleDeleteModal}>
                <i className="fa fa-trash"></i>
              </button>
              <button className="issue__modal__btn">
                <i className="fa fa-expand-arrows-alt"></i>
              </button>
              <button className="issue__modal__btn" onClick={onHideModal}>
                <i className="fa fa-times"></i>
              </button>
            </div>
          </Modal.Header>
          <Modal.Body className="p-[24px]">
            <div className="flex w-full flex-wrap pb-16">
              <div className="md:full lg:w-4/6 pr-10">
                <h3 className="text-2xl font-semibold h-[42px] leading-tight">
                  {currentIssue?.title}
                </h3>
                <div className="pt-4 pb-2 text-15 font-medium">Description</div>
                {isEdit ? (
                  <>
                    <ReactQuill
                      ref={quillRef}
                      id="editor__container"
                      theme="snow"
                      value={description}
                      onChange={handleChangeEditor}
                      modules={modules}
                      placeholder={'Write something...'}
                    />
                    <div className="mt-3">
                      <button
                        className="btn bg-textLink text-white px-3 py-2 font-medium hover:bg-[#0067ff]"
                        type="submit"
                        onClick={onSave}
                      >
                        Save
                      </button>
                      <button className="btn text-textDark px-3 py-2 ml-2" onClick={handleCancel}>
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="wrapper-editor relative hover:bg-backgroundLight py-1">
                    <button
                      className="ml-auto mb-1 text-xs absolute right-0 mr-1 cursor-pointer z-10"
                      onClick={handleEdit}
                    >
                      <i className="fa fa-pencil-alt"></i>
                    </button>
                    <ReactQuill
                      readOnly
                      id="editor__container"
                      className={`editor-disable ${!isEdit && 'disable'} mt-4`}
                      theme="snow"
                      value={description}
                      modules={modules}
                      placeholder={'Write something...'}
                    />
                  </div>
                )}

                <IssueComment issue={currentIssue} />
              </div>
              <div className="md-full lg:w-2/6">
                <IssueStatus issue={currentIssue} handleChangeIssue={handleChangeIssue} />
                <IssueReporter issue={currentIssue} handleChangeIssue={handleChangeIssue} />
                <div className="status">
                  <IssueAssignee issue={currentIssue} handleChangeIssue={handleChangeIssue} />
                </div>
                <IssuePriority issue={currentIssue} handleChangeIssue={handleChangeIssue} />
              </div>
            </div>
          </Modal.Body>
        </>
      )}
      <Modal show={isOpen} className="modal-delete" onHide={toggleDeleteModal}>
        <Modal.Body>
          <h3>Are you sure you want to delete this issue?</h3>
          <p>This action cannot be undone</p>
          <div className="mt-3">
            <button
              className="btn bg-textLink text-white px-3 py-2 font-medium hover:bg-[#0067ff]"
              type="submit"
              onClick={onDeleteIssue}
            >
              Save
            </button>
            <button className="btn text-textDark px-3 py-2 ml-2" onClick={toggleDeleteModal}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </Modal>
  );
};

export default forwardRef<ModalHandle, ModalProps>(IssueModal);
