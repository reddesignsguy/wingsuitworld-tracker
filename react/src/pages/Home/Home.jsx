import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
// @ts-ignore
import background_video from "../../media/videos/background_video.mp4";
import "./Home.css";

export default function Home() {
  // Can only use react hooks within components/classes
  const [input, setInput] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);
  const navigate = useNavigate();

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
            <i>FIND YOUR WINGSUIT WORLD STATS </i>
          </h2>
          <section className="search_container">
            <input
              className="search_bar"
              placeholder={"Enter a roblox name, eg: builderman"}
              onInput={(e) => {
                // @ts-ignore
                setInput(e.target.value);
              }}
              // User searches with ENTER key
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  navigate(`/player?${input}`);
                }
              }}
            ></input>
            {/* User clicks search button */}
            <NavLink to={`/player?${input}`}>
              <IoSearchSharp className="search_button"></IoSearchSharp>
            </NavLink>
          </section>
        </section>
        <video className="video" autoPlay loop muted>
          <source src={background_video} type="video/mp4"></source>
        </video>
      </section>
    </>
  );
}
