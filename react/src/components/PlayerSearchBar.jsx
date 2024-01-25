import styled from "styled-components";
import './PlayerSearchBar.css';
import { SearchBar } from "./SearchBar";
import { PrimaryButton } from "./Buttons/PrimaryButton";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";

export const StyledSearchBar = styled(SearchBar)`
  background-color: var(--bright);
  color: var(--light-gray);
  font-size: 1rem;
  width: 30rem;
  height: auto;
  border-width: 0px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  padding: 1rem;
  &:focus {
    color: var(--dark-gray);
    outline: none;

    padding-left: 2rem;
  }
`;

const SearchButton = styled(PrimaryButton)`
  border-radius: 0px 5px 5px 0px;
  padding: 0.15rem;
`;


export const PlayerSearchBar = function({input, setInput}) {
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  
  return <div className="search_container" style={{filter: focus && 'drop-shadow(0px 0px 10px var(--primary))'}}>
            <StyledSearchBar 
              placeholder={"Enter a roblox name, eg: builderman"}
              onInput={(e) => {
                // @ts-ignore
                setInput(e.target.value);
              }}
              // User searches with ENTER key
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  navigate(`/player/${input}`);
                }
              }
            }
            onFocus={()=>{setFocus(true)}}
            onBlur={()=>{setFocus(false)}}
            />
            {/* User clicks search button */}
            <SearchButton>
              <NavLink to={`/player?${input}`}>
                <IoSearchSharp className="search_button_icon" size={'100%'}></IoSearchSharp>
              </NavLink>
            </SearchButton>
  </div>
}