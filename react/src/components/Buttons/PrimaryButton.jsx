const { default: styled } = require("styled-components");
const { Button } = require("./Button");

export const PrimaryButton = styled(Button)`
  background-color: #f08119;
  color: #050505;
  &:hover {
    background: linear-gradient(270deg, #d8c70f, #f08119, #d8c70f, #f08119);
    background-size: 400% 400%;
    filter: drop-shadow(0px 00px 5px #f28c26);

    -webkit-animation: AnimationName 2s ease infinite;
    -moz-animation: AnimationName 2s ease infinite;
    animation: AnimationName 2s ease infinite;
  }

  @-webkit-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @-moz-keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @keyframes AnimationName {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;
