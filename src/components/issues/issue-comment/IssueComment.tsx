import React, { useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import './issue-comment.scss';

const IssueComment = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChangeHeight = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const parentElement = e.currentTarget.parentNode as HTMLElement;
    parentElement.setAttribute('data-replicated-value', e.currentTarget.value);
  };

  const handleFocus = () => {
    if (!isEdit) {
      setIsEdit(true);
    }
  };

  const handleCancel = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEdit(false);
  };

  const handleCreateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex issue__comment">
      <span
        className="issue__avatar issue__avatar--w30 mr-2 shrink-0"
        style={{ backgroundImage: 'url("https://picsum.photos/200/300")' }}
      ></span>
      <div className="grow-default">
        <div className="text-textDark text-15 mb-2">Thuy Tran</div>
        <Form onSubmit={handleCreateComment}>
          <div className="editor__wrapper">
            <textarea
              onInput={handleChangeHeight}
              ref={textAreaRef}
              className="issue__editor px-3 py-2"
              name="comment"
              id=""
              rows={2}
              placeholder="Enter your comment"
              onFocus={handleFocus}
            ></textarea>
          </div>
          {isEdit && (
            <div className="mt-3">
              <button
                className="btn bg-textLink text-white px-3 py-2 font-medium hover:bg-[#0067ff]"
                type="submit"
              >
                Save
              </button>
              <button className="btn text-textDark px-3 py-2 ml-2" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default IssueComment;
