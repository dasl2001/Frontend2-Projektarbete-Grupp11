/*
Moduler och komponenter importeras.
*/
import { Link } from 'react-router-dom';
import '../css/navbar.css';

/*
Navbar är en funktion komponent i React.
loggedInUser är en prop som indikerar om det finns en användare inloggad.
Om loggedInUser är null eller undefined, visas inte "Logga ut"-knappen.
onLogout är en funktion som körs när användaren klickar på "Logga ut".
*/
function Navbar({ loggedInUser, onLogout }) {

/*
<nav> är HTML-elementet för navigering.
className="navbar" CSS-klass för att styla navigeringsmenyn.
<h2> visar logotypen eller rubriken för navigeringsmenyn.
<Link to="/" används för att navigera till hemsidan (/).
className="logo" är en CSS-klass för att styla logotypen.
<div> omsluter navigeringslänkarna och använder klassen navbar-center för att centrera innehållet.
<ul> är en oordnad lista som håller länkarna.
Varje <li> innehåller en Link-komponent som används för att navigera till olika sidor. 
Länkarna inkluderar /login, /register, /start, /todo, /events, /habits
loggedInUser ? ... : ...: är en ternär operator som kontrollerar om loggedInUser är true. 
Om användaren är inloggad visas en knapp: <button onClick={onLogout}>Logga ut</button>.
När knappen klickas anropas onLogout för att logga ut användaren.
*/
  return (
    <nav className="navbar">
      <h2 className="navbar-left">
        <Link to="/" className="logo">Grupp11</Link>
      </h2>
      <div className="navbar-center">
        <ul className="nav-links">
          <li><Link to="/login">Logga in</Link></li>
          <li><Link to="/register">Registrera</Link> </li>
          <li><Link to="/start">Startsida</Link></li>
          <li><Link to="/todo">Todos & Activities</Link></li>
          <li><Link to="/events">Event calendar</Link></li>
          <li><Link to="/habits">Habits</Link></li>
          <li><button onClick={onLogout}>Logga ut</button> </li>
        </ul>
      </div>
    </nav>
  );
}

/*
Gör det möjligt att importera och använda komponenten i andra filer.
*/
export default Navbar;


