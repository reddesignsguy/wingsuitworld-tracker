import "./Settings.css";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";

export default function Settings(props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <section className="settings-page">
      <div className="settings">
        {/* Desktop navbar items */}
        <ul className="settings__sidebar_desktop">
          <li>Account Settings</li>
          <li>Player Management</li>
        </ul>
        {/* Mobile nav bar */}
        <section className="settings__sidebar_mobile">
          <h3
            onClick={() => {
              setMobileSidebarOpen(!mobileSidebarOpen);
            }}
          >
            TitleHere + an arrow icon
          </h3>

          {/* Nav bar items */}
          {mobileSidebarOpen && (
            <ul className="settings__sidebar_mobile__items">
              <li>Account Settings</li>
              <li>Player Management</li>
            </ul>
          )}
        </section>
        <section className="settings__selected__menu">
          {<PlayerManagementMenu />}
        </section>
      </div>
    </section>
  );
}

function AccountSettingsMenu(props) {
  return (
    <>
      <section className="settings__selected__menu__header">
        <h3 className="settings__selected__menu__header__title">
          Account Settings
        </h3>
        <span className="settings__selected__menu___header_description"></span>
        <div className="settings__selected__menu__input__container">
          <input className="settings__selected__menu__input"></input>
          <button className="settings__selected__menu__button">
            <BiEditAlt className="settings__selected__menu__button__icon" />
          </button>
        </div>
      </section>
    </>
  );
}

function PlayerManagementMenu(props) {
  // todo: fetch associated playername programatically

  const playername = "mockDataTest";
  return (
    <>
      <section className="settings__selected__menu__header">
        <h2 className="settings__selected__menu__header__title">
          Player Management
        </h2>
        <span className="settings__selected__menu__description">
          Claim and manage your player
        </span>
      </section>
      <section className="settings__selected__menu__category">
        <h2>Player Profile</h2>
        <span className="settings__selected__menu__description">
          To claim a player's profile, enter the name of the ROBLOX player. You
          can only claim one profile at a time.
        </span>
      </section>
      {playername ? <UnclaimSection /> : <ClaimSection />}
    </>
  );
}

function SideBarItem(props) {
  const { icon, text, onClick } = props;
  return (
    <li className="">
      <div onClick={onClick()}>
        {icon}
        <span> {text}</span>
      </div>
    </li>
  );
}

function ClaimSection(props) {
  return (
    <>
      <input
        className="settings__selected__menu__input"
        placeholder={props.playername}
      ></input>
      <button className="settings__selected__menu__button_long">Claim</button>
    </>
  );
}

function UnclaimSection(props) {
  var { playername } = props;
  playername = "MockUsername. Change this in deployment!";

  return (
    <>
      <input
        className="settings__selected__menu__input_unselectable"
        placeholder={playername}
      ></input>
      <button className="settings__selected__menu__button_long_alternate">
        Unclaim
      </button>
    </>
  );
}
