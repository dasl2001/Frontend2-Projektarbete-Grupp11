/*
Moduler och komponenter importeras.
*/
import React from 'react';

/*
logoutMessage är en prop som innehåller ett meddelande som visas när en användare loggar ut.
clearLogoutMessage är en prop som är en funktion för att rensa/ta bort utloggningsmeddelandet.
*/
function Home({ logoutMessage, clearLogoutMessage }) {

/*
useEffect används för att köra en side effect när komponenten renderas eller när en specifik prop eller state ändras.
Om logoutMessage har ett värde sätts en timer för att automatiskt rensa meddelandet efter 1000 millisekunder.
Timer-funktion:
setTimeout anropar clearLogoutMessage efter 1000 millisekunder (1 sekund).
clearTimeout om komponenten avmonteras rensas timern för att undvika att försöka rensa meddelandet efter att komponenten tagits bort.
useEffect körs om någon av värdena i arrayen [logoutMessage, clearLogoutMessage] ändras.
Detta säkerställer att effekten endast körs när logoutMessage ändras.
*/
  React.useEffect(() => {
    if (logoutMessage) {
      const timer = setTimeout(() => clearLogoutMessage(), 1000); 
      return () => clearTimeout(timer); 
    }
  }, [logoutMessage, clearLogoutMessage]);

/*
Innehållet omsluts av ett <div>-element för strukturell ordning.
En rubrik visas med texten "Välkommen till hemsidan för Grupp11".
Om logoutMessage har ett värde visas ett stycke med meddelandet. 
CSS-klassen som används är logout-message.
*/
  return (
    <div>
      <h2>Välkommen till hemsidan för Grupp11</h2>
      {logoutMessage && <p className="logout-message">{logoutMessage}</p>}
      <p>Använd menyn ovan för att navigera till olika sidor.</p>
    </div>
  );
}


/*
Gör det tillgänglig för import i andra filer.
*/
export default Home;

