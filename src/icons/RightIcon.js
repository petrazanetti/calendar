import styled from "styled-components";

const StyledSvg = styled.svg`
  vertical-align: middle;
`;

const RightIcon = () => (
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 100 100"
  >
    <path
      d="M 24.25 90 c -0.896 0 -1.792 -0.342 -2.475 -1.025 c -1.367 -1.366 -1.367 -3.583 0 -4.949 L 60.8 45 L 21.775 5.975 c -1.367 -1.367 -1.367 -3.583 0 -4.95 c 1.367 -1.366 3.583 -1.366 4.95 0 l 41.5 41.5 c 1.367 1.366 1.367 3.583 0 4.949 l -41.5 41.5 C 26.042 89.658 25.146 90 24.25 90 z"
      transform=" matrix(1 0 0 1 0 0) "
      stroke-linecap="round"
    />
  </StyledSvg>
);

export default RightIcon;
