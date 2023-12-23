import styled from "styled-components";
import { Button } from "./Button";

export const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #7b7b7b;
  border: 1px solid #7b7b7b;
  &:hover {
    background-color: #7b7b7b;
    color: #050505;
  }
`;
