import styled from "styled-components";

const StyledSvg = styled.svg`
  vertical-align: middle;
`;

const LeftIcon = () => (
  <StyledSvg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 100 100"
  >
    <path
      d="M 65.75 90 c 0.896 0 1.792 -0.342 2.475 -1.025 c 1.367 -1.366 1.367 -3.583 0 -4.949 L 29.2 45 L 68.225 5.975 c 1.367 -1.367 1.367 -3.583 0 -4.95 c -1.367 -1.366 -3.583 -1.366 -4.95 0 l -41.5 41.5 c -1.367 1.366 -1.367 3.583 0 4.949 l 41.5 41.5 C 63.958 89.658 64.854 90 65.75 90 z"
      transform=" matrix(1 0 0 1 0 0) "
      strokeLinecap="round"
    />
  </StyledSvg>
);

export default LeftIcon;
