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

export interface UpdateHoverIssuePayload {
  status: IssueStatusType;
  nextStatus: string;
  id: string;
  index: number;
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
          break;
        }
        case IssueStatusType.SELECTED: {
          state.selectedIssues.splice(hoverIndex, 0, newIssue);
          break;
        }
        case IssueStatusType.IN_PROGRESS: {
          state.inProgressIssues.splice(hoverIndex, 0, newIssue);
          break;
        }
        default:
          state.doneIssues.splice(hoverIndex, 0, newIssue);
          break;
      }

      state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
      return state;
    },
    updateSingleTypeIssues: (state, action: PayloadAction<UpdateSingleTypeIssuesPayload>) => {
      const { payload } = action;
      const { status, issues } = payload;
      const prevStatus = (status[0].toLowerCase() + status.slice(1) + 'Issues') as keyof IssueState;
      state[prevStatus] = issues;
    },
    updateHoverIssues: (state, action: PayloadAction<UpdateHoverIssuePayload>) => {
      const { payload } = action;
      const { index, status, nextStatus, id } = payload;
      const prevStatus = (status[0].toLowerCase() + status.slice(1) + 'Issues') as keyof IssueState;

      const currentIssue = state[prevStatus].find((item) => item.id === id) as Issue;

      if (currentIssue) {
        const newIssue = { ...currentIssue, status: nextStatus };

        switch (nextStatus) {
          case IssueStatusType.BACKLOG: {
            state.backlogIssues.splice(index, 0, newIssue);
            break;
          }
          case IssueStatusType.SELECTED: {
            state.selectedIssues.splice(index, 0, newIssue);
            break;
          }
          case IssueStatusType.IN_PROGRESS: {
            state.inProgressIssues.splice(index, 0, newIssue);
            break;
          }
          default:
            state.doneIssues.splice(index, 0, newIssue);
            break;
        }

        state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== id);
        return state;
      }
    },
    updateIssue: (state, action) => {
      const { payload: issue } = action;

      if (issue.prevStatus) {
        const prevStatus = (issue.prevStatus[0].toLowerCase() +
          issue.prevStatus.slice(1) +
          'Issues') as keyof IssueState;
        const newStatus = (issue.status[0].toLowerCase() +
          issue.status.slice(1) +
          'Issues') as keyof IssueState;

        const currentIssue = state[prevStatus].find((item) => item.id === issue.id) as Issue;
        state[prevStatus] = [...state[prevStatus]].filter((item) => item.id !== issue.id);
        state[newStatus] = [...state[newStatus], { ...currentIssue, status: issue.status }];
        return state;
      }

      switch (issue.status) {
        case IssueStatusType.BACKLOG: {
          state.backlogIssues = state.backlogIssues.map((item) => {
            if (item.id !== issue.id) return { ...item };
            return issue;
          });
          return state;
        }
        case IssueStatusType.SELECTED: {
          state.selectedIssues = state.selectedIssues.map((item) => {
            if (item.id !== issue.id) return { ...item };
            return issue;
          });
          return state;
        }
        case IssueStatusType.IN_PROGRESS: {
          state.inProgressIssues = state.inProgressIssues.map((item) => {
            if (item.id !== issue.id) return { ...item };
            return issue;
          });
          return state;
        }
        default:
          state.doneIssues = state.doneIssues.map((item) => {
            if (item.id !== issue.id) return { ...item };
            return { ...item, ...issue };
          });
          return state;
      }
    }
  }
});

export const { getIssues, updateIssues, updateSingleTypeIssues, updateHoverIssues, updateIssue } =
  issueSlice.actions;
export default issueSlice.reducer;
