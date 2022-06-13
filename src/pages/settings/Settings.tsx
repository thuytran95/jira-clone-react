import { FormEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { updateProject } from 'redux-utils/project/projectSlice';
import { useAppDispatch, useAppSelector } from 'store';
import './settings.scss';

interface ProjectFormType {
  name: string;
  url: string;
  category?: string;
  description: string;
}

type EventType =
  | FormEvent<HTMLInputElement>
  | FormEvent<HTMLTextAreaElement>
  | FormEvent<HTMLSelectElement>;

const intialProject: ProjectFormType = {
  name: '',
  url: '',
  category: '',
  description: ''
};

const Settings = () => {
  const { project } = useAppSelector((state) => state.project);
  const [projectInfo, setProjectInfo] = useState<ProjectFormType>(intialProject);
  const [validation, setValidation] = useState<string>('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { name = '', url = '', description = '', category = '' } = project;
    setProjectInfo({
      name,
      url,
      description,
      category
    });
  }, [project]);

  const handleChange = (e: EventType) => {
    const { value, name } = e.currentTarget;
    if (name === 'name') {
      const newValue = value.replace(/\s\s+/g, ' ').trim();
      if (!newValue) {
        setValidation('Field is required.');
      } else {
        setValidation('');
      }
    }
    setProjectInfo((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleUpdateProject = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validation) {
      return;
    }
    dispatch(updateProject(projectInfo));
  };

  const handleCancel = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { name = '', url = '', description = '', category = '' } = project;

    setProjectInfo({
      name,
      url,
      description,
      category
    });

    setValidation('');
  };

  return (
    <div className="settings">
      <h4 className="mt-3 mb-6 text-2xl font-medium text-textDark">Project Settings</h4>
      <Form className="settings__form" onSubmit={handleUpdateProject}>
        <div className="settings__form__group flex flex-col">
          <label htmlFor="name" className="mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Project Name"
            className={`settings__form__input border-input ${validation && 'border-error'}`}
            name="name"
            value={projectInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className="settings__form__group flex flex-col mt-3">
          <label htmlFor="url" className="mb-2">
            URL
          </label>
          <input
            type="text"
            placeholder="Project URL"
            className="settings__form__input border-input bg-backgroundLight hover:bg-backgroundLight focus:border-borderInputFocus"
            name="url"
            value={projectInfo.url}
            disabled
          />
        </div>
        <div className="settings__form__group flex flex-col mt-3">
          <label htmlFor="catergory" className="mb-2">
            Category
          </label>
          <Form.Select name="category" value={projectInfo.category} onChange={handleChange}>
            <option value="Software">Software </option>
            <option value="Bussiness">Bussiness</option>
            <option value="Marketing">Marketing</option>
          </Form.Select>
        </div>

        <div className="settings__form__group flex flex-col mt-3">
          <label htmlFor="description" className="mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={projectInfo.description}
            onChange={handleChange}
            placeholder="Project Description"
            className="settings__form__textarea"
          />
        </div>

        <div className="mt-3">
          <button
            className="btn bg-textLink text-white px-3 py-2 font-medium hover:bg-[#0067ff]"
            type="submit"
            disabled={!!validation}
          >
            Save
          </button>
          <button type="button" className="btn text-textDark px-3 py-2 ml-2" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Settings;
