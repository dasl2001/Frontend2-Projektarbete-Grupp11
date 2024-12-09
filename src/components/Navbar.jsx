import { Link } from 'react-router-dom';
import '../css/navbar.css';




function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
       <Link to="/" className="logo">
          Grupp11 
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="/todo">Todo</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/habits">Habits</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right"></div>
    </nav>
  );
}

export default Navbar;


