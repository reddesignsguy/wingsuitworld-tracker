import "./Settings.css";
import { BiEditAlt, BiSolidUser } from "react-icons/bi";
import { IoIosSettings, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

const settings = ["Account Settings", "Player Management"];

export default function Settings(props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState(settings[0]);

  return (
    <section className="settings-page">
      <div className="settings">
        {/* 1. Desktop navbar items */}
        <ul className="settings__sidebar_desktop">
          <li>Account Settings</li>
          <li>Player Management</li>
        </ul>

        {/* 2a.Mobile nav bar */}
        <section className="settings__sidebar_mobile">
          <ActiveSettingHeaderMobile
            activeSetting={activeSetting}
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          />

          {/* 2b.Mobile nav bar items */}
          {mobileSidebarOpen && (
            <SideBarItems
              setActiveSettingOption={setActiveSetting}
              setMobileSidebarOpen={setMobileSidebarOpen}
              activeSetting={activeSetting}
            />
          )}
        </section>
        {/* 3. Selected menu */}
        <section className="settings__selected__menu">
          {<SelectedMenu activeSettingOption={activeSetting} />}
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
        <h2 className="settings__selected__menu__header__subtitle">
          Player Profile
        </h2>
        <span className="settings__selected__menu__description">
          To claim a player's profile, enter the name of the ROBLOX player. You
          can only claim one profile at a time.
        </span>
      </section>
      {playername ? <UnclaimSection /> : <ClaimSection />}
    </>
  );
}

function SelectedMenu(props) {
  const { activeSettingOption } = props;
  switch (activeSettingOption) {
    case "Account Settings":
      return <AccountSettingsMenu />;
    case "Player Management":
      return <PlayerManagementMenu />;
    default:
      return <AccountSettingsMenu />;
  }
}

function ActiveSettingHeaderMobile(props) {
  const { activeSetting, mobileSidebarOpen, setMobileSidebarOpen } = props;
  return (
    <h3
      className="settings__sidebar_mobile__header"
      onClick={() => {
        setMobileSidebarOpen(!mobileSidebarOpen);
      }}
    >
      <SettingIcon activeSetting={activeSetting} /> {activeSetting}
      {mobileSidebarOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </h3>
  );
}

function SideBarItems(props) {
  const { setActiveSettingOption, setMobileSidebarOpen, activeSetting } = props;
  return (
    <ul className="settings__sidebar_mobile__items">
      {/* Create nav bar component for each setting option */}
      {settings.map((settingOption) => (
        <li
          // Determines navbar behavior
          className={
            settingOption == activeSetting
              ? "settings__sidebar__item_active"
              : "settings__sidebar__item_inactive"
          }
          onClick={() => {
            setActiveSettingOption(settingOption);
            setMobileSidebarOpen(false);
          }}
        >
          {/* Nav bar Icon */}
          <SettingIcon settingOption={settingOption} />
          {/* Nav bar text */}
          {settingOption}
        </li>
      ))}
    </ul>
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

function SettingIcon(props) {
  const { settingOption } = props;
  switch (settingOption) {
    case "Account Settings":
      return <IoIosSettings />;
    case "Player Management":
      return <BiSolidUser />;
    default:
      return <BiSolidUser />;
  }
}
