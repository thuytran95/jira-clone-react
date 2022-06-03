import { Navigation } from 'components/navigation';
import {  Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
   <Routes>
     <Route path='/' element={<>
      <Navigation/>
        Board</>}>

     </Route>

     <Route path='/project/settings' element={<>
      <Navigation/>
        Setting</>}>

     </Route>
   </Routes>
  );
}

export default App;
