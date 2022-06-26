import { render, screen, waitFor } from '@testing-library/react';
import KanbanBoad from 'components/kanban-board/KanbanBoad';
import { Issue, IssueStatusType } from 'interface/issue';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Provider } from 'react-redux';
import store from 'store';

describe('Kanban board', () => {
  const wrapper = (issues: Issue[], status: IssueStatusType, handleShowIssue: () => void) => {
    return (
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <KanbanBoad
            issues={issues}
            status={IssueStatusType.BACKLOG}
            handleShowIssue={handleShowIssue}
          />
        </DndProvider>
      </Provider>
    );
  };

  it('should be render empty issue card', async () => {
    const handleChangeIssue = jest.fn();
    render(wrapper([], IssueStatusType.DONE, handleChangeIssue));
    expect(screen.findByText(/backlog 0/i));
  });

  it('should be render list of issue card', async () => {
    const issueList = [
      {
        type: 'Story',
        priority: 'Highest',
        title: 'Angular Spotify 🎧',
        description:
          '<h3>Hey Angular people, what\'s up? 😆</h3><p>I wanted to introduce you my latest application: <strong>Angular Spotify.</strong></p><p><br></p><p>It is a simple Spotify client built with Angular 11, Nx workspace, ngrx, TailwindCSS and ng-zorro.</p><p><br></p><p>Check out the&nbsp;live application&nbsp;-&gt; <a href="https://spotify.trungk18.com" rel="noopener noreferrer" target="_blank">https://spotify.trungk18.com</a></p><p><span style="color: var(--color-text-link);">Source code: </span><a href="https://github.com/trungk18/angular-spotify" rel="noopener noreferrer" target="_blank">https://github.com/trungk18/angular-spotify</a></p><p><br></p><p>Spotify premium&nbsp;is required for the Web Playback SDK to play music. If you are using a free account, you can still browse the app, but it couldn\'t play the music. Sorry about that&nbsp;🤣</p><h2><br></h2><p><a href="https://github.com/trungk18/angular-spotify/blob/main/libs/web/shared/assets/src/assets/readme/angular-spotify-demo-short.gif" rel="noopener noreferrer" target="_blank" style="color: var(--color-text-link); background-color: var(--color-bg-primary);"><img src="https://github.com/trungk18/angular-spotify/raw/main/libs/web/shared/assets/src/assets/readme/angular-spotify-demo-short.gif" alt="Angular Spotify Demo"></a></p><p><br></p><p><br></p><p><a href="https://github.com/trungk18/angular-spotify/blob/main/libs/web/shared/assets/src/assets/readme/angular-spotify-visualization.gif" rel="noopener noreferrer" target="_blank" style="color: var(--color-text-link); background-color: var(--color-bg-primary);"><img src="https://github.com/trungk18/angular-spotify/raw/main/libs/web/shared/assets/src/assets/readme/angular-spotify-visualization.gif" alt="Angular Spotify Visualizer"></a></p><p><br></p>',
        reporterId: 'd65047e5-f4cf-4caa-9a38-6073dcbab7d1',
        userIds: ['d65047e5-f4cf-4caa-9a38-6073dcbab7d1'],
        id: '2021',
        status: 'Backlog',
        createdAt: '2021-04-28T14:56:55.049Z',
        updatedAt: '2021-04-28T14:56:57.748Z',
        listPosition: 1
      },
      {
        id: '9584',
        title: 'What is Angular Jira clone application?',
        description:
          "<p>There have been a handful of cool Jira-cloned apps written in React/VueJS, which makes me wonder <strong>Why not Angular</strong>? And here you go.</p><p><br></p><p>This is <u>not only</u> a simplified Jira clone built with Angular, but also an example of a <u>modern, real-world</u> Angular codebase.</p><p><br></p><p><strong>Tech stack</strong></p><p><br></p><p><a href='https://raw.githubusercontent.com/trungk18/jira-clone-angular/master/frontend/src/assets/img/jira-clone-tech-stack.png' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214); background-color: rgb(255, 255, 255);'><img src='https://github.com/trungk18/jira-clone-angular/raw/master/frontend/src/assets/img/jira-clone-tech-stack.png' alt='Tech logos'></a></p><p><br></p><ul><li><a href='https://cli.angular.io/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Angular CLI</a></li><li><a href='https://datorama.github.io/akita/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Akita</a>&nbsp;state management</li><li><a href='https://nestjs.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>NestJS</a></li><li>UI modules:</li><li class='ql-indent-1'><a href='https://tailwindcss.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>TailwindCSS</a></li><li class='ql-indent-1'>Angular CDK&nbsp;<a href='https://material.angular.io/cdk/drag-drop/overview' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>drag and drop</a></li><li class='ql-indent-1'><a href='https://ng.ant.design/docs/introduce/en' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>ng-zorro</a>&nbsp;UI component:&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>tooltip</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>modal</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>select</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>icon</code> and more.</li><li class='ql-indent-1'><a href='https://github.com/KillerCodeMonkey/ngx-quill' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>ngx-quill</a></li><li><a href='https://www.netlify.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Netlify</a></li><li><a href='https://www.heroku.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Heroku</a></li></ul>",
        type: 'Task',
        status: 'Backlog',
        priority: 'Medium',
        listPosition: 2,
        createdAt: '2020-06-12T14:40:00.000Z',
        updatedAt: '2020-06-12T14:51:00.000Z',
        reporterId: 'd65047e5-f4cf-4caa-9a38-6073dcbab7d1',
        userIds: ['081ccaa1-5595-4621-8074-ede4927e67b0', '610451aa-10c8-4d7e-9363-311357c0b0dd']
      },
      {
        id: '9554',
        title: 'Who is the author of Angular Jira clone?',
        description:
          "<h3>Hi! My name is Trung 👋</h3><p>I am a seasoned front-end engineer with 7 years of passion in creating experience-driven products. I am proficient in Angular, React and TypeScript development.</p><p>I'm helping the Angular community by creating open sources and writing about interesting and useful topics. I found that there weren't many resources on building a proper real-world scale application, and that's my focus for sharing. My most notable open-source projects are:</p><p><br></p><ul><li><a href='https://spotify.trungk18.com/' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>spotify.trungk18.com</a></li><li><a href='https://jira.trungk18.com/' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>jira.trungk18.com</a></li><li><a href='https://tetris.trungk18.com/' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>tetris.trungk18.com</a></li><li><a href='https://github.com/angular-vietnam/100-days-of-angular' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>github.com/angular-vietnam/100-days-of-angular</a></li></ul><p><br></p><p>Recently, I organized&nbsp;<a href='https://twitter.com/angularsg' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>Angular Singapore</a>&nbsp;to advocate and grow the Angular developer community in Singapore. If you have any questions/problems with @angular or need any other advice? Feel free to&nbsp;✅&nbsp;<a href='https://calendly.com/angular-singapore/15min' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>book a FREE one-on-one meeting</a>&nbsp;with me. I'll try my best to help you. </p><p><br></p><p>Find me around the web</p><p><br></p><ul><li><a href='https://trungk18.com/' rel='noopener noreferrer' target='_blank'>https://trungk18.com/</a></li><li><a href='https://github.com/trungk18' rel='noopener noreferrer' target='_blank'>https://github.com/trungk18</a></li><li><a href='https://stackoverflow.com/users/3375906/trungk18' rel='noopener noreferrer' target='_blank'>https://stackoverflow.com/users/3375906</a></li><li><a href='https://stackblitz.com/@trungk18' rel='noopener noreferrer' target='_blank'>https://stackblitz.com/@trungk18</a></li><li><a href='https://twitter.com/tuantrungvo' rel='noopener noreferrer' target='_blank'>https://twitter.com/tuantrungvo</a></li></ul>",
        type: 'Task',
        status: 'Backlog',
        priority: 'High',
        listPosition: 3,
        createdAt: '2020-06-12T14:40:00.000Z',
        updatedAt: '2020-06-12T14:51:00.000Z',
        reporterId: 'd65047e5-f4cf-4caa-9a38-6073dcbab7d1',
        userIds: ['d65047e5-f4cf-4caa-9a38-6073dcbab7d1']
      }
    ];
    const handleShowIssue = jest.fn();
    render(wrapper(issueList, IssueStatusType.BACKLOG, handleShowIssue));

    const listIssueCard = await waitFor(() => screen.queryAllByTestId(/issue__card/));
    await waitFor(() => screen.getByRole('heading'));
    const title = IssueStatusType.BACKLOG + ' ' + issueList.length;

    expect(listIssueCard.length).toEqual(3);
    expect(screen.getByRole('heading')).toHaveTextContent(title);
  });



  it('should be render list of issue card test2', async () => {
    const issueList = [
      {
        type: 'Story',
        priority: 'Highest',
        title: 'Angular Spotify 🎧',
        description:
          '<h3>Hey Angular people, what\'s up? 😆</h3><p>I wanted to introduce you my latest application: <strong>Angular Spotify.</strong></p><p><br></p><p>It is a simple Spotify client built with Angular 11, Nx workspace, ngrx, TailwindCSS and ng-zorro.</p><p><br></p><p>Check out the&nbsp;live application&nbsp;-&gt; <a href="https://spotify.trungk18.com" rel="noopener noreferrer" target="_blank">https://spotify.trungk18.com</a></p><p><span style="color: var(--color-text-link);">Source code: </span><a href="https://github.com/trungk18/angular-spotify" rel="noopener noreferrer" target="_blank">https://github.com/trungk18/angular-spotify</a></p><p><br></p><p>Spotify premium&nbsp;is required for the Web Playback SDK to play music. If you are using a free account, you can still browse the app, but it couldn\'t play the music. Sorry about that&nbsp;🤣</p><h2><br></h2><p><a href="https://github.com/trungk18/angular-spotify/blob/main/libs/web/shared/assets/src/assets/readme/angular-spotify-demo-short.gif" rel="noopener noreferrer" target="_blank" style="color: var(--color-text-link); background-color: var(--color-bg-primary);"><img src="https://github.com/trungk18/angular-spotify/raw/main/libs/web/shared/assets/src/assets/readme/angular-spotify-demo-short.gif" alt="Angular Spotify Demo"></a></p><p><br></p><p><br></p><p><a href="https://github.com/trungk18/angular-spotify/blob/main/libs/web/shared/assets/src/assets/readme/angular-spotify-visualization.gif" rel="noopener noreferrer" target="_blank" style="color: var(--color-text-link); background-color: var(--color-bg-primary);"><img src="https://github.com/trungk18/angular-spotify/raw/main/libs/web/shared/assets/src/assets/readme/angular-spotify-visualization.gif" alt="Angular Spotify Visualizer"></a></p><p><br></p>',
        reporterId: 'd65047e5-f4cf-4caa-9a38-6073dcbab7d1',
        userIds: ['d65047e5-f4cf-4caa-9a38-6073dcbab7d1'],
        id: '2021',
        status: 'Backlog',
        createdAt: '2021-04-28T14:56:55.049Z',
        updatedAt: '2021-04-28T14:56:57.748Z',
        listPosition: 1
      },
      {
        id: '9584',
        title: 'What is Angular Jira clone application?',
        description:
          "<p>There have been a handful of cool Jira-cloned apps written in React/VueJS, which makes me wonder <strong>Why not Angular</strong>? And here you go.</p><p><br></p><p>This is <u>not only</u> a simplified Jira clone built with Angular, but also an example of a <u>modern, real-world</u> Angular codebase.</p><p><br></p><p><strong>Tech stack</strong></p><p><br></p><p><a href='https://raw.githubusercontent.com/trungk18/jira-clone-angular/master/frontend/src/assets/img/jira-clone-tech-stack.png' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214); background-color: rgb(255, 255, 255);'><img src='https://github.com/trungk18/jira-clone-angular/raw/master/frontend/src/assets/img/jira-clone-tech-stack.png' alt='Tech logos'></a></p><p><br></p><ul><li><a href='https://cli.angular.io/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Angular CLI</a></li><li><a href='https://datorama.github.io/akita/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Akita</a>&nbsp;state management</li><li><a href='https://nestjs.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>NestJS</a></li><li>UI modules:</li><li class='ql-indent-1'><a href='https://tailwindcss.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>TailwindCSS</a></li><li class='ql-indent-1'>Angular CDK&nbsp;<a href='https://material.angular.io/cdk/drag-drop/overview' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>drag and drop</a></li><li class='ql-indent-1'><a href='https://ng.ant.design/docs/introduce/en' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>ng-zorro</a>&nbsp;UI component:&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>tooltip</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>modal</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>select</code>,&nbsp;<code style='background-color: rgba(27, 31, 35, 0.05);'>icon</code> and more.</li><li class='ql-indent-1'><a href='https://github.com/KillerCodeMonkey/ngx-quill' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>ngx-quill</a></li><li><a href='https://www.netlify.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Netlify</a></li><li><a href='https://www.heroku.com/' rel='noopener noreferrer' target='_blank' style='color: rgb(3, 102, 214);'>Heroku</a></li></ul>",
        type: 'Task',
        status: 'Backlog',
        priority: 'Medium',
        listPosition: 2,
        createdAt: '2020-06-12T14:40:00.000Z',
        updatedAt: '2020-06-12T14:51:00.000Z',
        reporterId: 'd65047e5-f4cf-4caa-9a38-6073dcbab7d1',
        userIds: ['081ccaa1-5595-4621-8074-ede4927e67b0', '610451aa-10c8-4d7e-9363-311357c0b0dd']
      },
      {
        id: '9554',
        title: 'Who is the author of Angular Jira clone?',
        description:
          "<h3>Hi! My name is Trung 👋</h3><p>I am a seasoned front-end engineer with 7 years of passion in creating experience-driven products. I am proficient in Angular, React and TypeScript development.</p><p>I'm helping the Angular community by creating open sources and writing about interesting and useful topics. I found that there weren't many resources on building a proper real-world scale application, and that's my focus for sharing. My most notable open-source projects are:</p><p><br></p><ul><li><a href='https://spotify.trungk18.com/' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>spotify.trungk18.com</a></li><li><a href='https://jira.trungk18.com/' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>jira.trungk18.com</a></li><li><a href='https://tetris.trungk18.com/' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>tetris.trungk18.com</a></li><li><a href='https://github.com/angular-vietnam/100-days-of-angular' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>github.com/angular-vietnam/100-days-of-angular</a></li></ul><p><br></p><p>Recently, I organized&nbsp;<a href='https://twitter.com/angularsg' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>Angular Singapore</a>&nbsp;to advocate and grow the Angular developer community in Singapore. If you have any questions/problems with @angular or need any other advice? Feel free to&nbsp;✅&nbsp;<a href='https://calendly.com/angular-singapore/15min' rel='noopener noreferrer' target='_blank' style='color: var(--color-text-link);'>book a FREE one-on-one meeting</a>&nbsp;with me. I'll try my best to help you. </p><p><br></p><p>Find me around the web</p><p><br></p><ul><li><a href='https://trungk18.com/' rel='noopener noreferrer' target='_blank'>https://trungk18.com/</a></li><li><a href='https://github.com/trungk18' rel='noopener noreferrer' target='_blank'>https://github.com/trungk18</a></li><li><a href='https://stackoverflow.com/users/3375906/trungk18' rel='noopener noreferrer' target='_blank'>https://stackoverflow.com/users/3375906</a></li><li><a href='https://stackblitz.com/@trungk18' rel='noopener noreferrer' target='_blank'>https://stackblitz.com/@trungk18</a></li><li><a href='https://twitter.com/tuantrungvo' rel='noopener noreferrer' target='_blank'>https://twitter.com/tuantrungvo</a></li></ul>",
        type: 'Task',
        status: 'Backlog',
        priority: 'High',
        listPosition: 3,
        createdAt: '2020-06-12T14:40:00.000Z',
        updatedAt: '2020-06-12T14:51:00.000Z',
        reporterId: 'd65047e5-f4cf-4caa-9a38-6073dcbab7d1',
        userIds: ['d65047e5-f4cf-4caa-9a38-6073dcbab7d1']
      }
    ];
    const handleShowIssue = jest.fn();
    render(wrapper(issueList, IssueStatusType.BACKLOG, handleShowIssue));

    const listIssueCard = await waitFor(() => screen.queryAllByTestId(/issue__card/));
    await waitFor(() => screen.getByRole('heading'));
    const title = IssueStatusType.BACKLOG + ' ' + issueList.length;

    expect(listIssueCard.length).toEqual(3);
    expect(screen.getByRole('heading')).toHaveTextContent(title);
  });
});
