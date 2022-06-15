import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue, IssueStatusType } from 'interface/issue';

export interface IssueState {
  backlogIssues: Issue[];
  selectedIssues: Issue[];
  inProgressIssues: Issue[];
  doneIssues: Issue[];
}

export interface UpdateIssuesPayload {
  status: IssueStatusType;
  issue: Issue;
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
    },
    updateIssues: (state, action: PayloadAction<UpdateIssuesPayload>) => {
      const { payload } = action;
      const { status, issue } = payload;

      const issueStatus = issue.status as string;
      const prevStatus = (issueStatus[0].toLowerCase() +
        issueStatus.slice(1) +
        'Issues') as keyof IssueState;
      console.log(prevStatus);
      switch (status) {
        case IssueStatusType.BACKLOG: {
          state.backlogIssues.push({ ...issue, status });
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
        }
        case IssueStatusType.SELECTED: {
          state.selectedIssues.push({ ...issue, status });
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
        }
        case IssueStatusType.IN_PROGRESS: {
          state.inProgressIssues.push({ ...issue, status });
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
        }
        default:
          state.doneIssues.push({ ...issue, status });
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
      }

      return state;
    }
  }
});

export const { getIssues, updateIssues } = issueSlice.actions;
export default issueSlice.reducer;
