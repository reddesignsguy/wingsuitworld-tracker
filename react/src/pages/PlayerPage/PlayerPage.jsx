import "./PlayerPage.css";
// @ts-ignore
import intro__background__1 from "../../media/vectors/player-page__intro__background.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlayerPage() {
  const [[name, rank, img, topScore, totalScore, maps], setPlayer] = useState([
    null,
    null,
    null,
    null,
    null,
    [
      {
        title: "shouldn't be appearing",
        plays: 69696969,
        img: "https://tr.rbxcdn.com/36614e9167f2da136af82915edcfa46e/150/150/Image/Png",
        code: "shouldnt be appearing",
      },
    ],
  ]);

  const { playername } = useParams();

  useEffect(() => {
    const fetchPlayerData = async () => {
      const data = await fetch(`http://localhost:5051/player/${playername}`);
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

    fetchPlayerData();
  }, []);

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
