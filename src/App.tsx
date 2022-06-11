import { Navigation, Breadcum } from 'components';
import { Kanban, Settings } from 'pages';
import { Routes, Route, Outlet } from 'react-router-dom';
import { useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="flex w-100">
            <Navigation />
            <div className="main grow-default flex flex-col">
              <Breadcum />
              <div className="main__content mt-3 grow-default">
                <Outlet />
              </div>
            </div>
          </div>
        }
      >
        <Route
          index
          element={
            <DndProvider backend={HTML5Backend}>
              <Kanban />
            </DndProvider>
          }
        ></Route>
        <Route
          path="/project/kanban"
          element={
            <DndProvider backend={HTML5Backend}>
              <Kanban />
            </DndProvider>
          }
        ></Route>
        <Route path="/project/settings" element={<Settings />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
