import { Link } from "react-router-dom";
import Settings from "../components/navbar/settings/Settings";

import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <h1>
        <Link to="/">Journal</Link> <Link to="/entries">Entries</Link>
      </h1>
      <div style={{ float: "right" }}>
        <Settings />
      </div>
      <br />
      <br />
    </div>
  );
}

export default NavBar;
