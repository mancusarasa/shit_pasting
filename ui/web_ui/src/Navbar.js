import './Navbar.css';
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">Shitpasting</div>
        <ul className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/myPastes">My Pastes</Link> 
        </ul>
    </div>
  );
}
