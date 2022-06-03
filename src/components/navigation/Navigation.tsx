import { Navbar } from 'components/navbar';
import { Sidebar } from 'components/sidebar';
import { useState } from 'react';
import './navigation.scss';

const Navigation = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="navigation flex">
      <Navbar />
      <Sidebar showSidebar={showSidebar}/>
      <div className="overlay">
        <button className="btn bg-white text-textDarkest" onClick={handleShowSidebar}>
          <i className={`fa fa-angle-${showSidebar ? "left" : "right"}`}></i>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
