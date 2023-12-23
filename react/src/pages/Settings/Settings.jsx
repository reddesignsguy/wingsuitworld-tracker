import "./Settings.css";
import { BiEditAlt, BiSolidUser } from "react-icons/bi";
import { IoIosSettings, IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { getUserById, unclaimProfile, claimProfile } from "../../apis/apis";
import usePlayername from "../../hooks/usePlayername";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import ClaimProfilePopup from "../../components/ClaimProfileModal";
import Modal from "../../components/Modal/Modal";

const settings = ["Account Settings", "Player Management"];

const queryClient = new QueryClient();

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
  const playername = usePlayername();
  const { user } = useAuth0();
  const { data, status } = useQuery({
    queryKey: ["userData"],
    queryFn: () => {
      console.log("refetching user data from api because it's not in cache");
      return getUserById(user?.sub);
    },
  });

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

      {data?.playerName ? <UnclaimSection /> : <ClaimSection />}
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

// 512494
function ClaimSection(props) {
  const { isAuthenticated, user } = useAuth0();
  const [inputPlayername, setInputPlayernameInput] = useState("");
  const [claimProfileModalOpen, setClaimProfileModalOpen] = useState(false);

  useEffect(() => {
    console.log(claimProfileModalOpen);
  }, [claimProfileModalOpen]);

  // * abstracted this bc. children and the HTML don't need to know how react states are implemented
  function openModal() {
    setClaimProfileModalOpen(true);
  }
  function closeModal() {
    setClaimProfileModalOpen(false);
  }

  return (
    <>
      <input
        className="settings__selected__menu__input"
        placeholder={props.playername}
        onChange={(e) => {
          // @ts-ignore
          setInputPlayernameInput(e.target.value);
        }}
      ></input>
      <button
        className="settings__selected__menu__button_long"
        onClick={async () => {
          if (isAuthenticated) {
            // todo: assert that the player is in datastore + exists
            openModal();
          }
        }}
      >
        Claim
      </button>
      {claimProfileModalOpen && (
        <ClaimProfilePopup
          isOpen={claimProfileModalOpen}
          playerName={inputPlayername}
          onClose={closeModal}
        />
      )}
    </>
  );
}

// ! How to make a reusable button component with customizable PopUps?
// function PopUpButton({ text, PopUpComponent }) {
//   const [showPopUp, setShowPopUp] = useState(false);
//   return (
//     <>
//       <button
//         className="settings__selected__menu__button_long"
//         onClick={async () => {
//           setShowPopUp(true);
//         }}
//       >
//         {text}
//       </button>
//       {showPopUp && <PopUpComponent />}
//     </>
//   );
// }

function UnclaimSection(props) {
  const { isAuthenticated, user } = useAuth0();
  const playername = usePlayername();

  return (
    <>
      <input
        className="settings__selected__menu__input_unselectable"
        placeholder={playername}
      ></input>
      <button
        className="settings__selected__menu__button_long_alternate"
        onClick={async () => {
          if (!isAuthenticated) {
            return;
          }
          const unclaimed = user && unclaimProfile(user.sub);
          if (unclaimed !== null) {
            // todo please try again msg
          } else {
            queryClient.invalidateQueries({ queryKey: ["userData"] });
          }
        }}
      >
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
