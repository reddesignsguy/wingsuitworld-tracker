import { useAuth0 } from "@auth0/auth0-react";
import "./ClaimProfileModal.css";
import Modal from "../Modal";
import { SecondaryButton } from "../../Buttons/SecondaryButton";
import { PrimaryButton } from "../../Buttons/PrimaryButton";

const { useState } = require("react");
const { claimProfile } = require("../../../apis/apis");

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
