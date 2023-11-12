import "./navbar.css";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline, IoLogOut, IoMenu } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  // TODO: Move around auth0 vars like logout
  const { isAuthenticated, isLoading, logout } = useAuth0();

  const menuRef = useRef(); // Attach this ref to the attreibute of dropdown menu on screen (For detecting clicks "outside" to turn off menu)
  const picRef = useRef();

  // Close menu if clicking outside menu
  useEffect(() => {
    let handler = (e) => {
      if (!open) return;

      // If clicking on picture in order to close, then let the onClick from the picture do the job, and not this
      // @ts-ignore
      if (picRef.current.contains(e.target)) return;

      // @ts-ignore
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
  });

  function LoggedInComponent(props) {
    const { loginWithRedirect } = useAuth0();
    let component;
    // Show logged in state
    if (props.loggedIn) {
      component = (
        <li className="picture_container" ref={picRef}>
          <img
            src="https://tr.rbxcdn.com/15DAY-Avatar-BC8E5946272E2104B2C0935DEA4D020D-Png/352/352/Avatar/Png/noFilter"
            alt="Character image"
            onClick={() => {
              setOpen(!open);
            }}
          ></img>
        </li>
      );
    }
    // Show Login button
    else {
      component = (
        <li>
          <a className="inactive" onClick={() => loginWithRedirect()}>
            Login
          </a>
        </li>
      );
    }
    return component;
  }

  return !isLoading ? (
    <>
      <link href="https://css.gg/css" rel="stylesheet" />{" "}
      {/* TODO: Import only necessary icons */}
      <nav className="nav">
        <h1 className="site-title">Coming soon :D</h1>
        <ul>
          <li className="nav_mobile">
            <IoMenu />
          </li>
          <li className="nav_desktop">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Home
            </NavLink>
          </li>
          <li className="nav_desktop">
            <NavLink
              to="/leaderboards"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Leaderboards
            </NavLink>
          </li>
          <li className="nav_desktop">
            <NavLink
              to="/player"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              My Profile
            </NavLink>
          </li>
          {/* TODO: Modify hard-coded picture */}
          <LoggedInComponent loggedIn={isAuthenticated} />
        </ul>
      </nav>
      <section
        className={`dropdown-menu ${open ? "active" : "inactive"}`}
        ref={menuRef}
      >
        <section className="info">
          <h2> Vexeo</h2>
          <span> Rank #3</span>
        </section>
        {/* Spans are divs but are in-line rather than block, used for marking up text */}
        <hr />
        <ul>
          <DropdownItem
            icon={<IoSettingsOutline size="1.3rem" />}
            text="Settings"
            link="/settings"
          ></DropdownItem>
          <DropdownItem
            icon={<IoLogOut size="1.3rem" />}
            text="Logout"
            onClick={() => logout()}
          ></DropdownItem>
        </ul>
      </section>
    </>
  ) : null;
}

function DropdownItem(props) {
  return (
    <li>
      {props.onClick ? (
        <a onClick={props.onClick}>
          {props.icon}
          <span> {props.text}</span>
        </a>
      ) : (
        <NavLink to={props.link}>
          {props.icon}
          <span> {props.text}</span>
        </NavLink>
      )}
    </li>
  );
}
