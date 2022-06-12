import { Breadcum,Navigation } from 'components';
import { Kanban,Settings } from 'pages';
import { Outlet,Route,Routes } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex w-100">
            <Navigation />
            <div className="main grow-default flex flex-col max-h-screen">
              <Breadcum />
              <div className="main__content mt-3 grow-default">
                <Outlet />
              </div>
            </div>
          </div>
        }
      >
        <Route index element={<Kanban />}></Route>
        <Route path="/project/kanban" element={<Kanban />}></Route>
        <Route path="/project/settings" element={<Settings />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
