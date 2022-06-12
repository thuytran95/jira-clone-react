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
  reducers: {}
});

export default projectSlice.reducer;
