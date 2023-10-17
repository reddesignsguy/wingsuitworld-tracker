import "./navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <h1 className="site-title">WingsuitWorld</h1>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav li.active" : ".nav a"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/leaderboards"
            className={({ isActive }) =>
              isActive ? "nav li.active" : ".nav a"
            }
          >
            Leaderboards
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/player"
            className={({ isActive }) =>
              isActive ? "nav li.active" : ".nav a"
            }
          >
            My profile
          </NavLink>
        </li>
        <li className="picture_container">
          <img
            src="https://tr.rbxcdn.com/15DAY-Avatar-BC8E5946272E2104B2C0935DEA4D020D-Png/352/352/Avatar/Png/noFilter"
            alt="Character image"
          ></img>
        </li>
      </ul>
    </nav>
  );
}
