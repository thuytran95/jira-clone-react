import { useState } from 'react';
import { Navbar, Sidebar } from 'components';
import './navigation.scss';

const Navigation = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="navigation flex">
      <Navbar />
      <Sidebar showSidebar={showSidebar} />
      <div className="overlay">
        <button className="btn bg-white text-textDarkest" onClick={handleShowSidebar}>
          <i className={`fa fa-angle-${showSidebar ? 'left' : 'right'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
