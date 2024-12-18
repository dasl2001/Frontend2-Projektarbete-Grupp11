import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser({ userList, setUserList }) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  const navigate = useNavigate();

  function handleRegisterClick() {
    if (newUsername.trim() && newPassword.trim()) {
      const userExists = userList.some((user) => user.username === newUsername);

      if (userExists) {
        setRegisterMessage("Användarnamnet upptaget.");
      } else {
        const newUser = {
          username: newUsername,
          password: newPassword,
          tasks: [],
          habits: [],
          events: [],
        };
        setUserList((prevList) => [...prevList, newUser]);
        setRegisterMessage("Användare registrerad.");
        setTimeout(() => navigate("/login"), 500);
      }
    } else {
      setRegisterMessage("Vänligen fyll i alla fält.");
    }
  }

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

export default AddUser;
