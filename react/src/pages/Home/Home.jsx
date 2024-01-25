import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useAuth0 } from "@auth0/auth0-react";
// @ts-ignore
import background_video from "../../media/videos/background_video.mp4";
import "./Home.css";
import { PlayerSearchBar } from "../../components/PlayerSearchBar";
import { PrimaryButton } from "../../components/Buttons/PrimaryButton";
import styled from "styled-components";


export default function Home() {
  // Can only use react hooks within components/classes
  const [input, setInput] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);

  useEffect(() => {
    // TODO: 1) API call to datastore when input changes
    // TODO: 2) Update autocomplete
    if (input != "") {
      setAutocomplete(["I'm being updated!", "sup dood"]);
    }
  }, [input]);

  return (
    <>
      <section className="homePage">
        <section className="homePage_middle">
          <h2>
            <i>FIND YOUR STATS </i>
          </h2>
          <section className="search_container">
            <PlayerSearchBar
            input={input}
            setInput={setInput}
            />
          </section>
        </section>
        <video className="video" autoPlay loop muted>
          <source src={background_video} type="video/mp4"></source>
        </video>
      </section>
    </>
  );
}
