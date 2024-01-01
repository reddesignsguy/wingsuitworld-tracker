import { useAuth0 } from "@auth0/auth0-react";
import "./ClaimProfileModal.css";
import Modal from "../Modal";
import { IoCheckmarkCircle } from "react-icons/io5";
import { SecondaryButton } from "../../Buttons/SecondaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SuperPrimaryButton } from "../../Buttons/SuperPrimaryButton";
// @ts-ignore
import { TransparentSearchBar } from "../../TransparentSearchBar";
import styled from "styled-components";
import { AlternatePrimaryButton } from "../../Buttons/AlternatePrimaryButton";
import { WarningText } from "../../Warning";

const { useState } = require("react");
const { claimProfile } = require("../../../apis/apis");

const warning = "Incorrect profile code. Please try again";
export default function ClaimProfileModal({ isOpen, playerName, onClose }) {
  const { isAuthenticated, user } = useAuth0();
  const [input, setInput] = useState("");
  const [isClaimSuccessful, setIsClaimSuccessful] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const queryClient = useQueryClient();
  const claimMutation = useMutation({
    mutationFn: async (userId) => {
      // @ts-ignore
      const result = await claimProfile(userId, playerName, input);
      if (result == null) {
        throw new Error("Unsuccessful claiming");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      setIsClaimSuccessful(true);
    },
    onError: (err) => {
      setShowWarning(true);
    },
  });

  const handleClaim = async () => {
    if (!isAuthenticated || !user) {
      return;
    }

    const userId = user.sub;

    try {
      // @ts-ignore
      const res = await claimMutation.mutateAsync(userId);
    } catch (err) {}
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* 1. Claim profile content */}
      {!isClaimSuccessful && (
        <section className="claim-profile-popup">
          <h2 className="claim-profile-popup__title">Enter profile code</h2>
          <span className="claim-profile-popup__description">
            1. Log in to the game as <b>{playerName}</b>
            <br />
            <br />
            2. Click <b>Settings</b>
            <br />
            <br />
            3. Press <b>Reveal 6-digit profile code</b>
            <br />
            <br />
          </span>
          <TransparentSearchBar
            className="profile-code__input"
            placeholder="eg: 123456"
            maxLength={6}
            onInput={(e) => {
              // @ts-ignore
              setInput(e.target.value);
            }}
          ></TransparentSearchBar>
          {showWarning && <WarningText>{warning}</WarningText>}
          <div className="claim-profile-popup__button-section">
            <SecondaryButton onClick={() => onClose()}>Cancel</SecondaryButton>
            <SuperPrimaryButton onClick={handleClaim}>Claim</SuperPrimaryButton>
          </div>
        </section>
      )}
      {/* 2. Successful claim content */}
      {isClaimSuccessful && (
        <>
          <IoCheckmarkCircle color="#88d332" size={"150px"} />
          <h2 className="claim-profile_success__title">Success!</h2>
          <span>
            You successfuly claimed <b>{playerName}'s</b> profile.
          </span>
          <br />
          <AlternatePrimaryButton
            onClick={() => {
              onClose();
            }}
          >
            Continue
          </AlternatePrimaryButton>
        </>
      )}
    </Modal>
  );
}
