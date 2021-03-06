import { IssueCreate,IssueSearch } from 'components/issues';
import { useState } from 'react';
import './navbar.scss';

const avatarSource =
  'https://i.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const handleToggleSearchModal = () => {
    setShowSearch(!showSearch);
  };
  const handleToggleCreateModal = () => {
    setShowCreate(!showCreate);
  };

  return (
    <div className="navbar h-screen py-12 flex flex-col bg-[#0747a6] items-center justify-start w-[64px] text-white">
      <nav className=" flex flex-col items-center justify-start gap-2">
        <button className="text-3xl text-center mb-4">
          <i className="fab fa-battle-net"></i>
        </button>
        <button
            className="navbar__btn hover:bg-[#1c63ce] rounded-full p-2 w-10 h-10 base-tooltip"
            onClick={handleToggleSearchModal}
            data-content="Search issues"
          >
            <i className="fa fa-search"></i>
          </button>

          <button
            className="navbar__btn hover:bg-[#1c63ce] rounded-full p-2 w-10 h-10 base-tooltip"
            onClick={handleToggleCreateModal}
            data-content='Create issue'
          >
            <i className="fa fa-plus"></i>
          </button>
      </nav>
      <div className="mt-auto">
        <div className="w-[26px] h-[26px] rounded-full overflow-hidden cursor-pointer">
          <img className="w-100 h-100  object-cover" src={avatarSource} />
        </div>
      </div>
      <IssueSearch show={showSearch} handleToggleModal={handleToggleSearchModal} />
      <IssueCreate show={showCreate} handleToggleModal={handleToggleCreateModal} />
    </div>
  );
};

export default Navbar;
