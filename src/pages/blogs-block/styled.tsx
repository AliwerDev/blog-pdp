import styled from "@emotion/styled";

const Styled = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 40px;

  .container {
    max-width: 1180px;
    margin-inline: auto;
  }

  .title {
    font-weight: bold;
    font-size: 36px;
  }

  .block_header {
    margin-bottom: 15px;
  }
`;

export const NavigationButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;

  &.swiper-button-disabled {
    background-color: #dadada !important;
    cursor: default;
  }
`;

export default Styled;
