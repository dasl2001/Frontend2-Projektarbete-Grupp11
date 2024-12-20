/*
Moduler och komponenter importeras.
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

/*
userList är en lista med användarobjekt som innehåller username och password.
setLoggedInUser är en funktion för att sätta den inloggade användaren i applikationens tillstånd.
logoutMessage är ett meddelande som visas när man nyligen loggats ut.
clearLogoutMessage är en funktion för att rensa logoutMessage.
nameInput håller värdet för användarnamn som skrivits in.
passwordInput håller värdet för lösenord som skrivits in.
loginError håller felmeddelanden om inloggningen misslyckas.
useNavigate är funktion för att navigera till andra sidor. 
*/
function Login({
  userList,
  setLoggedInUser,
  logoutMessage,
  clearLogoutMessage,
}) {
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  /*
Söker i userList efter där både användarnamn och lösenord matchar det som skrivs in. 
trim() tar bort eventuella extra mellanslag i början/slutet av inmatningen.
*/
  function handleLoginClick() {
    const foundUser = userList.find(
      (user) =>
        user.username === nameInput.trim() &&
        user.password === passwordInput.trim()
    );

    /*
Uppdaterar applikationens tillstånd med den inloggade användaren.
Tar bort logoutMessage om det finns. 
Om tidigare försök misslyckades, rensas felmeddelandet här.
*/
    if (foundUser) {
      setLoggedInUser(foundUser);
      clearLogoutMessage();
      setLoginError("");

      /*
Använder fetch för att hämta ett slumpmässigt citat från API:et quotable.io.
Om API-förfrågan misslyckas kastas ett fel.
*/
      fetch("https://api.quotable.io/random")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP-fel! Status: ${response.status}`);
          }
          return response.json();
        })

        /*
Om citatet hämtas korrekt visar en välkomsthälsning tillsammans med citatet och dess författare i en alert.
Om något går fel visas en backup-hälsning och navigerar till /start.
*/
        .then((quoteData) => {
          const quote = quoteData.content;
          const author = quoteData.author;
          alert(`Välkommen ${foundUser.username}!\n"${quote}"\n- ${author}`);
          navigate("/start");
        })
        .catch((error) => {
          console.error(
            "Ett tekniskt fel uppstod, citatet kunde tyvärr inte hämtas. :",
            error
          );
          alert(
            `Välkommen ${foundUser.username}!\n(Ett tekniskt fel uppstod, citatet kunde tyvärr inte hämtas.)`
          );
          navigate("/start");
        });

      /*
Om man har skrivit in fel lösenord eller användarnamn eller om användaren inte finns visas ett felmeddelande: "Fel användarnamn eller lösenord."
*/
    } else {
      setLoginError("Fel användarnamn eller lösenord.");
    }
  }

  /*
Allt innehåll placeras i en <div> med klassen login-container.
En rubrik med texten "Logga in".
Om logoutMessage finns, visas det som en paragraf. 
När animationen slutar rensas meddelandet med clearLogoutMessage.
Två fält för användarnamn och lösenord, kopplade till nameInput respektive passwordInput via value och onChange.
En knapp för att initiera inloggning genom att anropa handleLoginClick.
Om loginError har ett värde visas det som ett felmeddelande.
*/
  return (
    <div className="login-container">
      <h2 className="login-title">Logga in</h2>
      {logoutMessage && (
        <p className="logout-message" onAnimationEnd={clearLogoutMessage}>
          {logoutMessage}
        </p>
      )}
      <div className="login-form">
        <input
          type="text"
          placeholder="Användarnamn"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLoginClick} className="login-button">
          Logga in
        </button>
        {loginError && <p className="login-error">{loginError}</p>}
      </div>
    </div>
  );
}

/*
Gör det tillgänglig för import i andra filer.
*/
export default Login;
