import "./PlayerPage.css";
// @ts-ignore
import intro__background__1 from "../../media/vectors/player-page__intro__background.svg";

export default function PlayerPage() {
  const topScore = `${1129}sp`;
  const totalScore = `${4949}sp`;

  return (
    <section className="playerPage">
      <section className="grid">
        <section className="intro">
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
          {/* <section className="container__avatar__top-score">
            <span>Top Score</span>
            <span>{topScore}</span>
          </section>
          <section className="container__avatar__total-score">
            <span>Total Score</span>
            <span>{totalScore}</span>
          </section> */}
        </section>
      </section>
      <section className="container maps"></section>
    </section>
  );
}
