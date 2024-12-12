/*
Moduler och komponenter importeras
*/
import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Start from './pages/Start';
import Login from './pages/Login';
import AddUser from './pages/AddUser';
import Todo from './pages/Todo';
import TodoDetails from './components/TodoDetails';
import Events from './pages/Events';
import Habits from './pages/Habits';
import Navbar from './components/Navbar';

/*
useState([]) skapar en state-variabel tasks, som initialt är en tom array.
setTasks är en funktion som används för att uppdatera tasks.
*/
function App() {
  const [tasks, setTasks] = useState([]);



/*
Routes och Route används från react-router-dom för att definiera navigeringsvägar i applikationen.
"/" är hemsidan för applikationen och renderar komponenten <Login />.
"/register" renderar komponenten <AddUser />.
"/start" renderar komponenten <Start />.
Passerar tasks som en prop till komponenten. 
tasks  innehåller data som behövs för startsidan. 
"/todo" renderar komponenten <Todo />.
Passerar både tasks och setTasks som props:
tasks för att visa den aktuella listan med uppgifter.
setTasks för att möjliggöra att användaren kan lägga till, ta bort eller ändra uppgifter.
"/todo/:id" renderar komponenten <TodoDetails />.
:id är en dynamisk parameter som matchar en specifik aktivitet baserat på ID.
Passerar både tasks och setTasks som props för visning och ändring av aktiviteten.
"/events" renderar komponenten <Events />.
"/habits" renderar komponenten <Habits />.
<Navbar> renderar  navigeringskomponenten. 
*/
return (
  <>
    <Navbar />
    <Routes>
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<AddUser /> } /> 
      <Route path="/start" element={<Start tasks={tasks} />} />
      <Route path="/todo" element={<Todo tasks={tasks} setTasks={setTasks} />} />
      <Route path="/todo/:id" element={<TodoDetails tasks={tasks} setTasks={setTasks} />} />
      <Route path="/events" element={<Events />} />
      <Route path="/habits" element={<Habits />} />
    </Routes>
  </>
);
}

/*
Gör App-komponenten tillgänglig för import i andra filer. 
*/
export default App;



