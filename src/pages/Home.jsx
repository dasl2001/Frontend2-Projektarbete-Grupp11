import React from 'react';

function Home({ logoutMessage, clearLogoutMessage }) {
  React.useEffect(() => {
    if (logoutMessage) {
      const timer = setTimeout(() => clearLogoutMessage(), 1000); 
      return () => clearTimeout(timer); 
    }
  }, [logoutMessage, clearLogoutMessage]);

  return (
    <div>
      <h2>Välkommen till hemsidan för Grupp11</h2>
      {logoutMessage && <p className="logout-message">{logoutMessage}</p>}
      <p>Använd menyn ovan för att navigera till olika sidor.</p>
    </div>
  );
}

export default Home;

