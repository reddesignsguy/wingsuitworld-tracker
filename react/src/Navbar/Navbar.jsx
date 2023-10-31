import "./navbar.css";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline, IoLogOut } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const menuRef = useRef(); // Attach this ref to the attreibute of dropdown menu on screen (For detecting clicks "outside" to turn off menu)
  const picRef = useRef();

  // Close menu if clicking outside menu
  useEffect(() => {
    let handler = (e) => {
      if (!open) return;

      // If clicking on picture to close, then let the onClick from the picture do the job, and not this
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
    let component;
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
    } else {
      component = (
        <li>
          <NavLink
            to="/register"
            className="inactive"
            onClick={() => {
              setLoggedIn(true);
            }}
          >
            <span>Login</span>
          </NavLink>
        </li>
      );
    }
    return component;
  }

  return (
    <>
      <link href="https://css.gg/css" rel="stylesheet" />{" "}
      {/* TODO: Import only necessary icons */}
      <nav className="nav">
        <h1 className="site-title">WingsuitWorld</h1>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboards"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              Leaderboards
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/player"
              className={({ isActive }) => (isActive ? "active" : "inactive")}
            >
              My Profile
            </NavLink>
          </li>
          {/* TODO: Modify hard-coded picture */}
          <LoggedInComponent loggedIn={loggedIn} />
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
            link="/logout"
          ></DropdownItem>
          <LoggedInComponent loggedIn={loggedIn} />
        </ul>
      </section>
    </>
  );
}

function DropdownItem(props) {
  return (
    <li>
      <NavLink to={props.link}>
        {props.icon}
        <span> {props.text}</span>
      </NavLink>
    </li>
  );
}
