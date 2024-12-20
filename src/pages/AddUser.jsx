/*
Moduler och komponenter importeras.
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/adduser.css';
/*
userList är en prop som innehåller en lista med befintliga användare.
setUserList är en funktion som uppdaterar listan med användare.
*/
function AddUser({ userList, setUserList }) {

/*
newUsername och newPassword är ett tillstånd för att hålla det nya användarnamnet och lösenordet som användaren skriver in.
registerMessage är ett meddelande som visar feedback. 
navigate är en funktion för att navigera till en annan route.
*/
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const navigate = useNavigate();

/*
Kontrollerar att både användarnamn och lösenord har värden (inga tomma fält).
trim() tar bort onödiga mellanslag från input.
Använder some() för att kolla om användarnamnet finns i userList.
Om det redan existerar, visas meddelandet "Användarnamnet upptaget".
Om användarnamnet är ledigt, skapas ett nytt användarobjekt med username och password. 
tasks, routines, events är tomma listor som representerar framtida data.
Uppdaterar användarlistan med setUserList genom att kopiera den tidigare listan och lägga till den nya användaren.
Sätter registerMessage till "Användare registrerad."
Efter 500 millisekunder navigeras man automatiskt till /login.
Om användarnamn eller lösenord saknas, visas meddelandet "Vänligen fyll i alla fält."
*/
  function handleRegisterClick() {
    if (newUsername.trim() && newPassword.trim()) {
      const userExists = userList.some((user) => user.username === newUsername);
      if (userExists) {
        setRegisterMessage('Användarnamnet upptaget.');
      } else {
        const newUser = {
          username: newUsername,
          password: newPassword,
          tasks: [],
          routines: [],
          events: [],
        };
        setUserList((prevList) => [...prevList, newUser]); 
        setRegisterMessage('Användare registrerad.');
        setTimeout(() => navigate('/login'), 500); 
      }
    } else {
      setRegisterMessage('Vänligen fyll i alla fält.');
    }
  }

/*
add-user-container används för att tillämpa styling, det är specifik design, huvudbehållaren för hela komponenten.
<h2> är  rubriken.
add-user-title används för att styla rubriken. 
<input> är ett formulärfält där vi kan skriva in användarnamn.
type="text" definierar att det är ett textfält.
className="add-user-input" används för att tillämpa design som marginaler, padding och gränser.
placeholder="Användarnamn" visar text i fältet när det är tomt.
value={newUsername} binder inputfältets värde till React-statevariabeln newUsername.
onChange={(e) => setNewUsername(e.target.value)} uppdaterar newUsername med värdet vi skriver in. 
e.target.value hämtar det aktuella värdet från inputfältet.
type="password" döljer det som skrivs in. 
add-user-button används för att styla knappen.
onClick={handleRegisterClick} anropar funktionen handleRegisterClick när vi trycker på knappen. 
Denna funktion hanterar inloggningslogiken, som att validera fälten och uppdatera användarlistan.
registerMessage && betyder att elementet endast renderas om registerMessage har ett värde.
add-user-message används för att styla meddelandet.
{registerMessage} hämtar texten från variabeln registerMessage, som uppdateras baserat på olika tillstånd i formuläret.
*/
return (
  <div className="add-user-container">
    <h2 className="add-user-title">Registrera användare</h2>
    <input
      type="text"
      className="add-user-input"
      placeholder="Användarnamn"
      value={newUsername}
      onChange={(e) => setNewUsername(e.target.value)}
    />
    <input
      type="password"
      className="add-user-input"
      placeholder="Lösenord"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
    />
    <button className="add-user-button" onClick={handleRegisterClick}>
      Registrera
    </button>
    {registerMessage && <p className="add-user-message">{registerMessage}</p>}
  </div>
);
}

/*
Gör det tillgänglig för import i andra filer.
*/
export default AddUser;



