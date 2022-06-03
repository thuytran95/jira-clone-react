import { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './sidebar.scss';

export const routes = [
  { title: 'Kanban Board', icon: <i className="fa fa-columns"></i>, path: '/project/kanban' },
  { title: 'Project Settings', icon: <i className="fa fa-cog"></i>, path: '/project/settings' }
];

interface SidebarProps {
  showSidebar: boolean;
}

const Sidebar: FunctionComponent<SidebarProps> = (props) => {
  const { showSidebar } = props;

  return (
    <div
      className={classNames('sidebar bg-backgroundLightest', {
        show: showSidebar
      })}
    >
      <div className='sidebar__content'>
        <div className="flex gap-4 px-1 py-6">
          <span>
            <i className="fab fa-affiliatetheme"></i>
          </span>
          <div className="text-textDark">
            <h6 className="text-15">React Jira Clone</h6>
            <p className="text-13">Software project</p>
          </div>
        </div>
        <div className="menu flex flex-col">
          {routes.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              className={({ isActive }) =>
                `flex items-center text-textDarkest py-2 px-3 hover:bg-backgroundLight rounded-[0.125rem] ${
                  isActive && 'text-textLink bg-backgroundLight'
                }`
              }
            >
              <span className="mr-4 text-2xl flex items-center">{item.icon}</span>
              <span className="text-15">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
