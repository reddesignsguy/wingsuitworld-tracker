const { default: styled } = require("styled-components");
const { PrimaryButton } = require("./PrimaryButton");

export const AlternatePrimaryButton = styled(PrimaryButton)`
  background-color: transparent;
  border: 2px solid #f08119;
  color: #f08119;
  &:hover {
    background: #fc902b;
    background-size: 400% 400%;
    color: black;
  }
`;
