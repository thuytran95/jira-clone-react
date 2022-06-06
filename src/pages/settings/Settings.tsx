import React from 'react';
import { Form } from 'react-bootstrap';
import './settings.scss';

const Settings = () => {
  return (
    <div className="settings">
      <h4 className="mt-3 mb-6 text-2xl font-medium text-textDark">Project Settings</h4>
      <Form className="settings__form">
        <div className="settings__form__group flex flex-col">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Project Name"
            className="settings__form__input border-input"
          />
        </div>
        <div className="settings__form__group flex flex-col mt-3">
          <label htmlFor="url" className="mb-2">
            URL
          </label>
          <input
            type="text"
            placeholder="Project URL"
            className="settings__form__input border-input  hover:bg-backgroundLight focus:bg-white focus:border-borderInputFocus"
          />
        </div>
        <div className="settings__form__group flex flex-col mt-3">
          <label htmlFor="catergory" className="mb-2">
            Category
          </label>
          <Form.Select>
            <option value="Software">Software </option>
            <option value="Bussiness">Bussiness</option>
            <option value="Marketing">Marketing</option>
          </Form.Select>
        </div>

        <div className="settings__form__group flex flex-col mt-3">
          <label htmlFor="description" className="mb-2">
            Description
          </label>
          <textarea placeholder="Project Description" className="settings__form__textarea " />
        </div>

        <div className="mt-3">
          <button
            className="btn bg-textLink text-white px-3 py-2 font-medium hover:bg-[#0067ff]"
            type="submit"
          >
            Save
          </button>
          <button className="btn text-textDark px-3 py-2 ml-2">Cancel</button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
