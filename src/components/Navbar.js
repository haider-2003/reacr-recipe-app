import { NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

// components
import SearchBar from "./SearchBar";
// styles
import "./Navbar.css";
function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <NavLink exact to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </NavLink>
        <SearchBar />
        <NavLink to="/create">Create Recipe</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
