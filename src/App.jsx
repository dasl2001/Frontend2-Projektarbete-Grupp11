import { Routes, Route, Link } from 'react-router-dom';
import Start from './pages/Start';
import Login from './pages/Login';
import Todo from './pages/Todo';
import Events from './pages/Events';
import Habits from './pages/Habits';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/"  element={<Login/> }/>
          <Route path="/start" element={<Start />} />
          <Route path="todo" element={<Todo />} />
          <Route path="/todo=:id" element={<Todo />} />
          <Route path="/events" element={<Events />} />
          <Route path="/habits" element={<Habits />} />
        </Routes>
    </>
  );
}

export default App;
