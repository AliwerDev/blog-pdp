import styled from "@emotion/styled";

const Styled = styled.div`
  width: 100%;
  height: 100%;
  background: #f8f8f8;
  padding-inline: 30px;

  .container {
    max-width: 1180px;
    margin-inline: auto;
  }

  .block_header {
    margin-bottom: 15px;

    .title {
      font-weight: 500;
      font-size: 38px;

      span {
        color: rgb(0, 197, 8);
      }
    }
  }

  @media (max-width: 480px) {
    padding-inline: 20px;
  }
`;

export default Styled;
