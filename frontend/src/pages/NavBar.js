import { Link } from "react-router-dom";

import "./NavBar.css"

function NavBar() {
  return (
    <nav>
      <h1>
        <Link to="/">Journal</Link> <Link to="/entries">Entries</Link>
      </h1>
    </nav>
  );
}

export default NavBar;
