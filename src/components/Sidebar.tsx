import React from 'react';

const Sidebar = () => {
  return (
    <div>
      <nav className="h-screen pt-12 flex flex-col items-center justify-start">
        <button className="text-3xl text-center">
          <i className="fab fa-battle-net"></i>
        </button>
        <button>
          <i className="fa fa-search"></i>
        </button>
        <button>
          <i className="fa fa-plus"></i>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
