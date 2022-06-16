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
  hoverIndex: number;
}

export interface UpdateSingleTypeIssuesPayload {
  status: IssueStatusType;
  issues: Issue[];
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
      const { status, issue, hoverIndex } = payload;
      const newIssue = { ...issue, status };

      const issueStatus = issue.status as string;
      const prevStatus = (issueStatus[0].toLowerCase() +
        issueStatus.slice(1) +
        'Issues') as keyof IssueState;

      switch (status) {
        case IssueStatusType.BACKLOG: {
          state.backlogIssues.splice(hoverIndex, 0, newIssue);
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
        }
        case IssueStatusType.SELECTED: {
          console.log('selectedF');
          state.selectedIssues.splice(hoverIndex, 0, newIssue);
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
        }
        case IssueStatusType.IN_PROGRESS: {
          state.inProgressIssues.splice(hoverIndex, 0, newIssue);
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
        }
        default:
          state.doneIssues.splice(hoverIndex, 0, newIssue);
          state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
          break;
      }

      return state;
    },
    updateSingleTypeIssues: (state, action: PayloadAction<UpdateSingleTypeIssuesPayload>) => {
      const { payload } = action;
      const { status, issues } = payload;
      const prevStatus = (status[0].toLowerCase() + status.slice(1) + 'Issues') as keyof IssueState;
      state[prevStatus] = issues;
    }
  }
});

export const { getIssues, updateIssues, updateSingleTypeIssues } = issueSlice.actions;
export default issueSlice.reducer;
