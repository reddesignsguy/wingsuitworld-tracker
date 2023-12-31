import styled from "styled-components";
import { SearchBar } from "./SearchBar";

export const PlayerSearchBar = styled(SearchBar)`
  background-color: var(--bright);
  color: var(--light-gray);
  font-size: 1rem;
  width: 30rem;
  height: auto;
  border-width: 0px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  padding: 1rem;
  transition: filter 0.3s ease, padding-left 0.3s ease;
  &:focus {
    color: var(--dark-gray);
    outline: none;
    filter: drop-shadow(0px 0px 10px var(--primary));
    padding-left: 2rem;
  }
`;
