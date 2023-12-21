import { useAuth0 } from "@auth0/auth0-react";
import AlertBar from "./AlertBar";

const { useState } = require("react");
const { claimProfile } = require("../apis/apis");

export default function ClaimProfilePopup(props) {
  const { isAuthenticated, user } = useAuth0();
  const { playerName, setAlertBar } = props; // prop destructuring
  const [input, setInput] = useState("");

  return (
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
          setAlertBar(<AlertBar text="You claimed this profile" />);
          if (isAuthenticated && user) {
            const userId = user.sub;
            const claimed = await claimProfile(userId, playerName, input);
          }
        }}
      >
        Claim
      </button>
    </section>
  );
}
