import { Link } from "react-router-dom";

import "./NavBar.css"

function NavBar() {
  return (
    <div>
      <h1>
        <Link to="/">Journal</Link> <Link to="/entries">Entries</Link>
      </h1>
    </div>
  );
}

export default NavBar;
