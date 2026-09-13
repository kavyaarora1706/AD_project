import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        FarmConnect
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/farmer/dashboard">
          Farmer
        </Link>

        <Link to="/buyer/dashboard">
          Buyer
        </Link>

        <NotificationBell />

        <Link to="/login">
          Login
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;