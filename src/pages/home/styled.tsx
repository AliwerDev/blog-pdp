import styled from "@emotion/styled";

const HomeStyled = styled.div`
  padding-top: 30px;
  max-width: 1200px;
  margin: 0 auto;

  .page_title {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    background: linear-gradient(to right, #b807d3 0%, #ffae00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 30px;
  }

  .tabs {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 0 auto;
    margin-bottom: 30px;

    .tab {
      padding: 2px 18px;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
      color: #7c7c7c;
      background-color: #f3f3f3;

      &.active {
        color: white;
        background-color: #000000;
      }
    }
  }

  .load_more {
    padding: 4px 20px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 14px;
    color: white;
    background-color: #000000;
    width: fit-content;
    margin: 0 auto;
    margin-top: 40px;
    text-transform: uppercase;
    letter-spacing: 4px;
  }
`;

export default HomeStyled;
