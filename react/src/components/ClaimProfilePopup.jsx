import { useAuth0 } from "@auth0/auth0-react";
import "./Modal.css";
import AlertBar from "./AlertBar";
import Modal from "./Modal";

const { useState } = require("react");
const { claimProfile } = require("../apis/apis");

// ! PopUp is now decoupled from the App state
// ! Now we need to find a way to close the popup -> is this managed by a state one level above?

// ! isClosed() is called that way (not close()) to differentiate between local and parent state
export default function ClaimProfileModal({ isOpen, playerName, onClose }) {
  const { isAuthenticated, user } = useAuth0();
  const [input, setInput] = useState("");
  const title = `Claim ${playerName}'s profile`;
  const [isClaimSuccessful, setIsClaimSuccessful] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* 1. Claim profile content */}
      {!isClaimSuccessful && (
        <section className="claim-profile-popup">
          <span>
            Log in to the game as {playerName} and enter your profile code
          </span>
          <input
            className="profile-code__input"
            placeholder="123456"
            onInput={(e) => {
              // @ts-ignore
              setInput(e.target.value);
            }}
          ></input>
          <button
            className="profile-code__input__button"
            onClick={async () => {
              if (isAuthenticated && user) {
                const userId = user.sub;
                const claimed = await claimProfile(userId, playerName, input);
                if (claimed?.ok) {
                  setIsClaimSuccessful(true);
                } else {
                  setIsClaimSuccessful(true);
                }
              }
            }}
          >
            Claim
          </button>
        </section>
      )}
      {/* 2. Successful claim content */}
      {isClaimSuccessful && (
        <>
          <span> {`You successfuly claimed ${playerName}'s profile.`}</span>
          <button
            onClick={() => {
              onClose();
            }}
          ></button>
        </>
      )}
    </Modal>
  );
}
