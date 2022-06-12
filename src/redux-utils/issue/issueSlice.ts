import { createSlice } from '@reduxjs/toolkit';
import { Issue,IssueStatusType } from 'interface/issue';

export interface IssueState {
  backlogIssues: Issue[];
  selectedIssues: Issue[];
  inProgressIssues: Issue[];
  doneIssues: Issue[];
}

const initialState: IssueState = {
  backlogIssues: [],
  selectedIssues: [],
  inProgressIssues: [],
  doneIssues: []
};

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    getIssues: (state, action) => {
      const { payload: project } = action;
      const newIssues = project?.issues?.reduce(
        (acc: IssueState, currentIssue: Issue) => {
          const { status } = currentIssue;
          switch (status) {
            case IssueStatusType.BACKLOG:
              acc.backlogIssues.push(currentIssue);
              break;
            case IssueStatusType.SELECTED:
              acc.selectedIssues.push(currentIssue);
              break;
            case IssueStatusType.IN_PROGRESS:
              acc.inProgressIssues.push(currentIssue);
              break;
            default:
              acc.doneIssues.push(currentIssue);
              break;
          }

          return acc;
        },
        {
          backlogIssues: [],
          selectedIssues: [],
          inProgressIssues: [],
          doneIssues: []
        }
      ) as IssueState;

      state.backlogIssues = newIssues.backlogIssues || [];
      state.selectedIssues = newIssues.selectedIssues || [];
      state.inProgressIssues = newIssues.inProgressIssues || [];
      state.doneIssues = newIssues.doneIssues || [];
    }
  }
});

export const { getIssues } = issueSlice.actions;
export default issueSlice.reducer;
