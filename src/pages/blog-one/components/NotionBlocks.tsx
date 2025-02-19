import NotionBlocks from "notion-block-renderer";
import styled from "@emotion/styled";

const Sample = ({ blocks }: { blocks: any[] }) => {
  return (
    <Wrapper>
      <NotionBlocks blocks={blocks} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .nbr-image {
    img {
      width: 100%;
    }
  }
`;

export default Sample;
