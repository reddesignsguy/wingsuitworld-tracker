const { default: styled } = require("styled-components");
const { Button } = require("./Button");

export const PrimaryButton = styled(Button)`
  background-color: #f08119;
  border: 2px solid #ff9633;
  color: #050505;
  &:hover {
    background: #fc902b;
    background-size: 400% 400%;
  }
`;
