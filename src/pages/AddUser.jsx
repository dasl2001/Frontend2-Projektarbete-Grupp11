/*
Moduler och komponenter importeras.
*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
En rubrik med texten "Registrera användare".
Typ: text.
Placeholder: "Användarnamn".
Kopplat till newUsername via value och onChange (uppdaterar tillståndet när användaren skriver).
Typ: password.
Placeholder: "Lösenord".
Kopplat till newPassword via value och onChange.
När knappen klickas anropas handleRegisterClick.
Om registerMessage har ett värde, visas det som ett stycke (<p>).
*/
  return (
    <div>
      <h2>Registrera användare</h2>
      <input
        type="text"
        placeholder="Användarnamn"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleRegisterClick}>Registrera</button>
      {registerMessage && <p>{registerMessage}</p>}
    </div>
  );
}

/*
Gör det tillgänglig för import i andra filer.
*/
export default AddUser;



