import "./Settings.css";
import { BiEditAlt, BiSolidUser } from "react-icons/bi";
import { IoIosSettings, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { unclaimProfile, getProfile } from "../../apis/apis";
import usePlayername from "../../hooks/usePlayername";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useQueryClient } from "@tanstack/react-query";
import ClaimProfileModal from "../../components/Modals/ClaimProfileModal";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import { TransparentSearchBar } from "../../components/TransparentSearchBar";
import { WarningText } from "../../components/Warning";
import { SecondaryDangerButton } from "../../components/Buttons/SecondaryDangerButton";
import UnclaimProfileModal from "./components/UnclaimProfileModal";

const settings = ["Account Settings", "Player Management"];

export default function Settings(props) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSetting, setActiveSetting] = useState(settings[0]);

  return (
    <section className="settings-page">
      <div className="settings">
        {/* 1. Desktop navbar items */}
        <ul className="settings__sidebar_desktop">
          <SideBarItems
            setActiveSetting={setActiveSetting}
            setMobileSidebarOpen={setMobileSidebarOpen}
            activeSetting={activeSetting}
          />
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
              setActiveSetting={setActiveSetting}
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
      <ClaimingSectionHandler />
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
  const { setActiveSetting, setMobileSidebarOpen, activeSetting } = props;
  return (
    <ul className="settings__sidebar__items">
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
            setActiveSetting(settingOption);
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

function ClaimingSectionHandler(props) {
  const { playername } = usePlayername();
  const [inputPlayername, setInputPlayernameInput] = useState("");
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [disconnectModalOpen, setDisconnectModalOpen] = useState(false);
  const [unclaimWarning, setUnclaimWarning] = useState(null);
  // const [unclaimModalOpen, setUnclaimModalOpen] = useState(false);

  // * abstracted this bc. children and the HTML don't need to know how react states are implemented
  const openClaimModal = () => {
    setClaimModalOpen(true);
  };

  const closeClaimModal = () => {
    setClaimModalOpen(false);
  };

  const openDisconnectModal = () => {
    setDisconnectModalOpen(true);
  };

  const closeDisconnectModal = () => {
    setDisconnectModalOpen(false);
  };

  return (
    <>
      {playername ? (
        <UnclaimSection
          openModal={openDisconnectModal}
          warning={unclaimWarning}
        />
      ) : (
        <ClaimSection
          openModal={openClaimModal}
          setInput={setInputPlayernameInput}
          input={inputPlayername}
        />
      )}

      {claimModalOpen && (
        <ClaimProfileModal
          isOpen={claimModalOpen}
          playerName={inputPlayername}
          onClose={closeClaimModal}
        />
      )}

      {disconnectModalOpen && (
        <UnclaimProfileModal
          isOpen={disconnectModalOpen}
          setWarning={setUnclaimWarning}
          onClose={closeDisconnectModal}
        />
      )}
    </>
  );
}

// 512494
const warning =
  "The player you entered has not played the game yet or does not exist on ROBLOX";
function ClaimSection({ openModal, setInput, input }) {
  const { isAuthenticated } = useAuth0();
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <TransparentSearchBar
        className="settings__selected__menu__input"
        placeholder={"eg: builderman"}
        onChange={(e) => {
          // @ts-ignore
          setInput(e.target.value);
        }}
      ></TransparentSearchBar>
      {showWarning && <WarningText>{warning}</WarningText>}
      <PrimaryButton
        onClick={async () => {
          if (!isAuthenticated) {
            return;
          }

          // todo: assert that the player is in datastore + exists
          const profileExists = await getProfile(input);
          if (profileExists == null) {
            setShowWarning(true);
            return;
          }
          setShowWarning(false);
          openModal();
        }}
      >
        Claim
      </PrimaryButton>
    </>
  );
}

function UnclaimSection({ openModal, warning }) {
  const { playername } = usePlayername();

  return (
    <>
      <input
        className="settings__selected__menu__input_unselectable"
        placeholder={playername}
      />
      {warning && <WarningText>{warning}</WarningText>}
      <SecondaryDangerButton
        className="settings__selected__menu__button_long_alternate"
        onClick={() => {
          openModal();
        }}
      >
        Unclaim
      </SecondaryDangerButton>
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
