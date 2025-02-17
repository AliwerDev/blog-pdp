import Styled from "./styled";
import { Avatar, Col, Row, Typography } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import "react-lazy-load-image-component/src/effects/blur.css";
import Importants from "./components/Importants";

const BlogOnePage = () => {
  return (
    <Styled>
      <div className="tags">
        <span className="tag">PDP EcoSystem</span>
        <span className="tag">Texnologiya</span>
      </div>
      <Row gutter={32}>
        <Col xs={24} lg={18}>
          <div className="content">
            <Typography.Title className="title">Tajribali va fidoyi mutaxassislardan iborat jamoamiz har doim o‘sish va rivojlanishga intiladi</Typography.Title>

            <div className="info_block">
              <div className="author-info">
                <Avatar icon={<UserOutlined />} />
                <span>Odilbek Mirzayev</span>
              </div>
              |
              <span>
                <CalendarOutlined /> 24.12.2024
              </span>
            </div>

            <LazyLoadImage className="image" src={"https://pdp.uz/static/media/2021.59ccb7e4fe11a67fa8e6.jpg"} alt="Blog Image" effect="blur" />
            <Typography className="text_content">Artificial Intelligence: Revolutionizing Healthcare. Artificial intelligence has made incredible strides in healthcare, offering new ways to diagnose diseases, predict patient outcomes, and tailor treatments to individual needs. Thanks to AI-powered algorithms, diseases can now be detected at earlier stages, allowing healthcare to become more efficient, cost-effective, and patient-centric.</Typography>
          </div>
        </Col>
        <Col xs={24} lg={6}>
          <Importants />
        </Col>
      </Row>
    </Styled>
  );
};
export default BlogOnePage;
