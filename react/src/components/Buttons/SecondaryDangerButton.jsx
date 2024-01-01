import styled from "styled-components";
import { SecondaryButton } from "./SecondaryButton";

export const SecondaryDangerButton = styled(SecondaryButton)`
  font-size: 1.2rem;
  color: #d74545;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    color: #d74545;
  }
`;
