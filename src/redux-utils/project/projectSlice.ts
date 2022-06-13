import { createSlice } from '@reduxjs/toolkit';
import { Project } from 'interface/project';
import projectData from 'assets/data/project.json';
interface ProjectState {
  project: Project;
}

const initState: ProjectState = {
  project: projectData
};

const projectSlice = createSlice({
  name: 'project',
  initialState: initState,
  reducers: {
    updateProject: (state, action) => {
      const newProject = { ...state.project, ...action.payload };
      state.project = newProject;
    }
  }
});

export default projectSlice.reducer;
export const { updateProject } = projectSlice.actions;
