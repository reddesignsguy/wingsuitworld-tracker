import "./PlayerPage.css";
// @ts-ignore
import intro__background__1 from "../../media/vectors/player-page__intro__background.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function PlayerPage({ setAlertBar }) {
  const [[name, rank, img, topScore, totalScore, maps], setPlayer] = useState([
    null,
    null,
    null,
    null,
    null,
    [],
  ]);
  const { playername } = useParams();
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchPlayerData = async () => {
      const data = await fetch(`http://localhost:5051/profile/${playername}`);
      // TODO: 1. Handle no player found
      // TODO: 3. Handle loading state (there's probably a standardized way of doing this)
      data.json().then((json) => {
        setPlayer([
          json.name,
          `Rank#${json.rank}`,
          json.img,
          json.topScore,
          json.totalScore,
          json.maps,
        ]);
      });
    };

    // shows alert bar that appears above navbar
    const calculateAlertBar = async () => {
      var profileOwner = await checkWhoClaimedProfile(playername);
      const loggedInUserId = user?.sub;

      // no one has claimed this profile
      if (profileOwner == null) {
        setAlertBar(
          <AlertBar
            text="Claim this profile"
            popup={
              <ClaimProfilePopup
                isAuthenticated={isAuthenticated}
                userId={loggedInUserId}
                playerName={playername}
                setAlertBar={setAlertBar}
              />
            }
          />
        );
      } else {
        // someone has claimed this profile
        profileOwner.json().then((profileOwnerData) => {
          if (profileOwnerData["userId"] == loggedInUserId) {
            setAlertBar(<AlertBar text="You claimed this profile" />);
          } else {
            setAlertBar(<AlertBar text="This profile is claimed" />);
          }
        });
      }
    };

    calculateAlertBar();
    fetchPlayerData();
  }, [user]);

  // TODO Implement Claim profile
  return (
    <section className="player-page">
      <section className="content">
        <section className="grid">
          <section className="intro">
            <section className="intro__text">
              <section className="intro__container__title">
                <span className="intro__title">{name}</span>
              </section>
              <span className="intro__rank">{rank}</span>
            </section>
            <img
              className="intro__background__1"
              src={intro__background__1}
            ></img>
          </section>
          <section className="container avatar">
            <img src={img}></img>
            <section className="container__avatar__score-titles">
              <span>Top Score</span>
              <span>Total Score</span>
            </section>
            <section className="container__avatar__scores">
              <span>{topScore}</span>
              <span>{totalScore}</span>
            </section>
          </section>
        </section>
        <section className="container maps">
          <section className="maps__title">
            <span> {`${name}'s Maps`} </span>
          </section>
          <section className="maps__grid">
            <Maps items={maps} />
          </section>
        </section>
      </section>
      <img
        className="background-picture"
        src="https://static.fanbyte.com/uploads/2021/11/Riders-Republic-110221-Shot-04.jpg"
      ></img>
    </section>
  );
}

// * Defined this outside of PlayerPage to prevent its re-creation every time the PlayerPage is rerendered
function Maps(props) {
  return (
    <>
      {props.items.map((item) => (
        <Map
          title={item.title}
          plays={item.plays}
          img={item.img}
          code={item.code}
        />
      ))}
    </>
  );
}

function Map(props) {
  return (
    <section className="map__container">
      <span className="map__container__title"> {props.title} </span>
      <span className="map__container__plays"> {props.plays} plays</span>
      <img src={props.img}></img>
      <span className="map__container__code"> {props.code}</span>
    </section>
  );
}

function AlertBar(props) {
  const { text, popup } = props;
  const [popupIsRevealed, setPopupIsRevealed] = useState(false);

  return (
    <>
      <section
        className={!popup ? "alert-bar" : "alert-bar_popup"}
        onClick={() => {
          setPopupIsRevealed(true);
        }}
      >
        <span className="alert-bar__text"> {text} </span>
      </section>

      {popup && popupIsRevealed ? popup : null}
    </>
  );
}

function ClaimProfilePopup(props) {
  const { isAuthenticated, userId, playerName, setAlertBar } = props; // prop destructuring
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
          if (isAuthenticated && userId) {
            const claimed = await claimProfile(
              props.userId,
              props.playerName,
              input
            );
          }
        }}
      >
        Claim
      </button>
    </section>
  );
}

// API Calls
async function claimProfile(userId, playerName, profileCode) {
  const data = {
    userId: userId,
    playerName: playerName,
    profileCode: profileCode,
  };

  var res = await fetch(`http://localhost:5051/profile/claim`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    return true;
  } else {
    return false;
  }
}

async function checkWhoClaimedProfile(playerName) {
  const data = {
    playerName: playerName,
  };
  var res = await fetch(`http://localhost:5051/user/playername/${playerName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.ok) {
    return res;
  } else {
    return null;
  }
}
