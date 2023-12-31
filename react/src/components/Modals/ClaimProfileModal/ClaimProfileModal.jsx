import { useAuth0 } from "@auth0/auth0-react";
import "./ClaimProfileModal.css";
import Modal from "../Modal";
import { IoCheckmarkCircle } from "react-icons/io5";
import { SecondaryButton } from "../../Buttons/SecondaryButton";
import { PrimaryButton } from "../../Buttons/PrimaryButton";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { SuperPrimaryButton } from "../../Buttons/SuperPrimaryButton";
// @ts-ignore
import { SearchBar } from "../../SearchBar";
import { TransparentSearchBar } from "../../TransparentSearchBar";
import styled from "styled-components";
import { AlternatePrimaryButton } from "../../Buttons/AlternatePrimaryButton";

const { useState } = require("react");
const { claimProfile } = require("../../../apis/apis");

const queryClient = new QueryClient();

export default function ClaimProfileModal({ isOpen, playerName, onClose }) {
  const { isAuthenticated, user } = useAuth0();
  const [input, setInput] = useState("");
  const [isClaimSuccessful, setIsClaimSuccessful] = useState(false);
  const claimMutation = useMutation({
    mutationFn: async () => {
      if (isAuthenticated && user) {
        // @ts-ignore
        const result = await claimProfile(user?.sub, playerName, input);
        // TODO: alert onSuccess callback if this is successful (we dont know if returning true is how it's done)
        return true;
      } else {
        return false;
      }
    },
    // @ts-ignore
    onSuccess: (data, variables, context) => {
      console.log(
        "successfully mutated server data, now i should be invalidating the cache"
      );
      setIsClaimSuccessful(true);
      queryClient.refetchQueries({ queryKey: ["userData"] });
    },
  });

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
          <div className="claim-profile-popup__button-section">
            <SecondaryButton onClick={() => onClose()}>Cancel</SecondaryButton>
            <SuperPrimaryButton
              onClick={async () => {
                // @ts-ignore
                const res = await claimMutation.mutateAsync();
              }}
            >
              Claim
            </SuperPrimaryButton>
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
