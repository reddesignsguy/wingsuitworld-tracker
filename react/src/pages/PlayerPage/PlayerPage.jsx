import "./PlayerPage.css";
// @ts-ignore
import intro__background__1 from "../../media/vectors/player-page__intro__background.svg";

/* Dummy Data */
const dummyMaps = [
  {
    title: "City Parkour",
    plays: "921",
    img: "https://tr.rbxcdn.com/36614e9167f2da136af82915edcfa46e/150/150/Image/Png",
    code: "cityp#1234",
  },
  {
    title: "Xtreme Airsports",
    plays: "3499",
    img: "https://tr.rbxcdn.com/cd4f1816027963266dd06117b003e868/150/150/Image/Png",
    code: "xtremee#4942",
  },
  {
    title: "City Parkour",
    plays: "921",
    img: "https://tr.rbxcdn.com/36614e9167f2da136af82915edcfa46e/150/150/Image/Png",
    code: "cityp#1234",
  },
  {
    title: "Xtreme Airsports",
    plays: "3499",
    img: "https://tr.rbxcdn.com/cd4f1816027963266dd06117b003e868/150/150/Image/Png",
    code: "xtremee#4942",
  },
  {
    title: "City Parkour",
    plays: "921",
    img: "https://tr.rbxcdn.com/36614e9167f2da136af82915edcfa46e/150/150/Image/Png",
    code: "cityp#1234",
  },
];

export default function PlayerPage() {
  const topScore = `${1129}sp`;
  const totalScore = `${4949}sp`;
  const name = "Vexeo";
  const rank = `Rank#1`;

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
            <img src='https://tr.rbxcdn.com/15DAY-Avatar-BC8E5946272E2104B2C0935DEA4D020D-Png/352/352/Avatar/Png/noFilter"'></img>
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
            <span> Vexeo's Maps </span>
          </section>
          <section className="maps__grid">
            <Maps items={dummyMaps} />
          </section>
        </section>
      </section>
      <img
        className="background-picture"
        src="https://lordsofgaming.net/wp-content/uploads/2021/11/Riders_Republic%E2%84%A2_rocket_flying-1024x576.png"
      ></img>
    </section>
  );
}

function Maps(props) {
  return (
    <>
      {props.items.map((item) => (
        <SingleMap
          title={item.title}
          plays={item.plays}
          img={item.img}
          code={item.code}
        />
      ))}
    </>
  );
  /* Load maps from props here */
}

function SingleMap(props) {
  return (
    <section className="map__container">
      <span className="map__container__title"> {props.title} </span>
      <span className="map__container__plays"> {props.plays} plays</span>
      <img src={props.img}></img>
      <span className="map__container__code"> {props.code}</span>
    </section>
  );
}
