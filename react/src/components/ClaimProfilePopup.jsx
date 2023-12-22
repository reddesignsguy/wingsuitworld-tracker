import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import "./ClaimProfileModal.css";
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
  const [isClaimSuccessful, setIsClaimSuccessful] = useState(false);

  const handleClaim = async () => {
    if (isAuthenticated && user) {
      const userId = user.sub;
      const claimed = await claimProfile(userId, playerName, input);
      if (claimed?.ok) {
        setIsClaimSuccessful(true);
      } else {
        setIsClaimSuccessful(true);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* 1. Claim profile content */}
      {!isClaimSuccessful && (
        <section className="claim-profile-popup">
          <h2 className="claim-profile-popup__title">Enter profile code</h2>
          <span className="claim-profile-popup__description">
            Log in to the game as {playerName} to find your profile code
          </span>
          <input
            className="profile-code__input"
            placeholder="123456"
            onInput={(e) => {
              // @ts-ignore
              setInput(e.target.value);
            }}
          ></input>
          <div className="claim-profile-popup__button-section">
            <SecondaryButton onClick={() => onClose()}>Cancel</SecondaryButton>
            <PrimaryButton
              onClick={() => {
                handleClaim();
              }}
            >
              Claim
            </PrimaryButton>
          </div>
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

const Button = styled.button`
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  min-width: 6rem;
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #7b7b7b;
  border: 1px solid #7b7b7b;
`;
const PrimaryButton = styled(Button)`
  background-color: #f08119;
  color: #050505;
`;
