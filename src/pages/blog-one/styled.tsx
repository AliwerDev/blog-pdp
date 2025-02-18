import styled from "@emotion/styled";

const Styled = styled.div`
  padding-inline: 30px;

  .container {
    padding-top: 30px;
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 80px;
  }

  .tags {
    margin: 10px 0;
    display: flex;
    gap: 10px;

    .tag {
      font-size: 12px;
      color: #8e8e8e;
      background-color: #ededed;
      padding: 2px 8px;
      border-radius: 60px;
    }
  }

  .info_block {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 16px;
    margin-bottom: 20px;
    color: #9b9b9b;
    font-size: 18px;

    .author-info {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 18px;
      color: #00000080;
    }
  }

  .title {
    font-size: 36px;
    font-weight: 500;
  }

  .image {
    width: 100%;
    border-radius: 20px;
    object-fit: cover;
    height: 400px;
  }

  .text_content {
    font-size: 18px;
    color: #00000080;
    margin-top: 20px;
  }

  .important {
    padding: 20px;
    border-radius: 20px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    .sub_title {
      font-size: 14px;
      color: #00000050;
      text-transform: uppercase;
      letter-spacing: 3px;
    }
  }
`;

export default Styled;
