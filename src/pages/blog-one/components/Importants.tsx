import styled from "@emotion/styled";
import { Typography } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Styled = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: #fafafa;
  display: flex;
  flex-direction: column;

  .sub_title {
    font-size: 14px;
    color: #00000050;
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-bottom: 30px;
  }

  .blog_item {
    display: flex;
    gap: 6px;
    margin-bottom: 15px;

    .image {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      object-fit: cover;
    }
    .text {
      font-size: 13px;
      color: #00000090;
      flex: 1;
      line-height: 1.2;
    }
  }
`;

const { Text } = Typography;

const Importants = () => {
  return (
    <Styled>
      <Text className="sub_title">Muhim e’lonlar</Text>

      <div className="blog_item">
        <LazyLoadImage className="image" src={"https://pdp.uz/static/media/2021.59ccb7e4fe11a67fa8e6.jpg"} alt="Blog Image" effect="blur" />
        <Typography className="text">Artificial Intelligence: Revolutionizing Healthcare very fuflozetion</Typography>
      </div>
      <div className="blog_item">
        <LazyLoadImage className="image" src={"https://pdp.uz/static/media/2021.59ccb7e4fe11a67fa8e6.jpg"} alt="Blog Image" effect="blur" />
        <Typography className="text">Artificial Intelligence: Revolutionizing Healthcare very fuflozetion</Typography>
      </div>
      <div className="blog_item">
        <LazyLoadImage className="image" src={"https://pdp.uz/static/media/2021.59ccb7e4fe11a67fa8e6.jpg"} alt="Blog Image" effect="blur" />
        <Typography className="text">Artificial Intelligence: Revolutionizing Healthcare very fuflozetion</Typography>
      </div>
      <div className="blog_item">
        <LazyLoadImage className="image" src={"https://pdp.uz/static/media/2021.59ccb7e4fe11a67fa8e6.jpg"} alt="Blog Image" effect="blur" />
        <Typography className="text">Artificial Intelligence: Revolutionizing Healthcare very fuflozetion</Typography>
      </div>
    </Styled>
  );
};

export default Importants;
