import styled from "styled-components";
import { SearchBar } from "./SearchBar";

export const TransparentSearchBar = styled(SearchBar)`
  background-color: transparent;
  color: #ffffff;
  width: 100%;
  height: auto;
  border: solid 2px gray;
  border-radius: 5px;
  padding: 1rem;
  transition: filter 0.3s ease, padding-left 0.3s ease;
  &:focus {
    border: solid 2px #ffffff;
    padding-left: 1.3rem;
  }
  &::placeholder {
    color: gray;
  }
`;
