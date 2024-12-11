import { Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Start from './pages/Start';
import Login from './pages/Login';
import Todo from './pages/Todo';
import TodoDetails from './components/TodoDetails';
import Events from './pages/Events';
import Habits from './pages/Habits';
import Navbar from './components/Navbar';

function App() {
  const [tasks, setTasks] = useState([]); 

  return (
    <>
      <Navbar />
        <Routes>
        <Route path="/" element={< Login /> } />
          <Route path="/start" element={<Start tasks={tasks} />} />
          <Route path="/todo" element={<Todo tasks={tasks} setTasks={setTasks} />} />
          <Route path="/todo/:id" element={<TodoDetails tasks={tasks} setTasks={setTasks} />} />
          <Route path="/events" element={<Events />} />
          <Route path="/habits" element={<Habits />} />
        </Routes>
    </>
  );
}

export default App;



