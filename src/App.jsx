/*
Moduler och komponenter importeras.
*/
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AddUser from './pages/AddUser';
import Start from './pages/Start';
import Todo from './pages/Todo';


/*
userList:
Lagrar listan över alla användare i applikationen.
Initialvärdet hämtas från localStorage. 
Om det finns sparade användare i localStorage, laddas dessa med JSON.parse(savedUsers).
Annars är listan tom.
setUserList används för att uppdatera listan över användare.
loggedInUser:
Representerar den användare som är inloggad.
Börjar som null (noll), vilket betyder att ingen är inloggad.
setLoggedInUser används för att uppdatera vem som är inloggad.
logoutMessage:
Lagrar ett meddelande som visas vid utloggning.  
Uppdateras med setLogoutMessage.
*/
function App() {
  const [userList, setUserList] = useState(() => {
    const savedUsers = localStorage.getItem('userList');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState('');

/*
useNavigate är en hook  som används för att navigera mellan olika sidor.
navigate('/start') används för att skickas /start.
*/
  const navigate = useNavigate();

/*
useEffect körs varje gång userList ändras.
Sparar den uppdaterade userList i localStorage som en JSON-sträng med localStorage.setItem.
*/
  useEffect(() => {
    localStorage.setItem('userList', JSON.stringify(userList));
  }, [userList]);

/*
Sätter loggedInUser till null.
Visa ett utloggningsmeddelande genom att uppdatera logoutMessage.
Navigeras sedan tillbaks till hemsidan (/).
*/
  function handleLogout() {
    setLoggedInUser(null);
    setLogoutMessage('Du har loggats ut.');
    navigate('/');
  }

/*
Navbar används för att visa en navigeringsmeny.
Använder loggedInUser för att anpassa visningen baserat på om man är inloggad.
onLogout är funktionen för att logga ut.
Routes hanterar navigering och renderar olika komponenter baserat på URL.
Varje Route definierar en specifik path och komponent (element) som ska renderas.
path="/" renderar Home-komponenten.
Skickar med logoutMessage och en funktion för att rensa meddelandet.
path="/login"  renderar Login-komponenten.
Skickar med userList (användardata) och funktioner för att logga in en användare.
path="/register" renderar AddUser-komponenten.
Skickar med userList och setUserList för att registrera nya användare.
path="/start" renderar Start-komponenten.
Skickar med uppgifter (tasks) från den inloggade användaren.
path="/todo" renderar Todo-komponenten.
Skickar med uppgifter (tasks) och en funktion (setTasks) för att uppdatera dem.
Vid uppdatering:
Uppdaterar den inloggade användarens uppgifter.
Uppdaterar userList med de nya uppgifterna.
path="/habits" renderar Habits-komponenten. 
path="/events" renderar Events-komponenten. 
*/
  return (
    <>
      <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home logoutMessage={logoutMessage} clearLogoutMessage={() => setLogoutMessage('')} />} />
        <Route path="/login" element={<Login userList={userList} setLoggedInUser={setLoggedInUser} logoutMessage={logoutMessage} clearLogoutMessage={() => setLogoutMessage('')} />} />
        <Route path="/register" element={<AddUser userList={userList} setUserList={setUserList} />} />
        <Route path="/start" element={<Start tasks={loggedInUser?.tasks || []} />} />
        <Route path="/todo"
          element={
            <Todo
              tasks={loggedInUser?.tasks || []}
              setTasks={(tasks) => {
                if (loggedInUser) {
                  const updatedUser = { ...loggedInUser, tasks };
                  setLoggedInUser(updatedUser);
                  setUserList((prevList) =>
                    prevList.map((user) =>
                      user.username === updatedUser.username ? updatedUser : user
                    )
                  );
                }
              }}
            />
          }
        />
      </Routes>
    </>
  );
}

/*
Gör det möjligt att importera och använda komponenten i andra filer.
*/
export default App;






