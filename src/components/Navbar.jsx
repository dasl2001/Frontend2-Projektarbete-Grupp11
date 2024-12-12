import { Link } from 'react-router-dom';
import '../css/navbar.css';




function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="navbar-left">
        <Link to="/" className="logo">
        Grupp11
      </Link>
    </h2>
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/start">Start</Link>
          </li>
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


