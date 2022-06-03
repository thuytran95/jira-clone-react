import { Navigation, Breadcum } from 'components';
import { Kanban, Settings } from 'pages';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex w-100">
            <Navigation />
            <div className="main grow-default">
              <Breadcum />
              <div className="main__content mt-3">
                <Outlet />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/project/kanban" element={<Kanban />}></Route>
        <Route path="/project/settings" element={<Settings />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
