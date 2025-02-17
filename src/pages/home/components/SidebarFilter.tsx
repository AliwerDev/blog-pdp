import styled from "@emotion/styled";
import { Checkbox, Typography, Space } from "antd";

const Styled = styled.div`
  .filter_body {
    padding: 20px;
    border-radius: 20px;
    background: #fafafa;
    display: flex;
    flex-direction: column;
  }

  .sub_title {
    margin-bottom: 16px;
  }
  .checkboxes {
    margin-bottom: 30px;
  }
`;

const { Title, Text } = Typography;

const SidebarFilter = () => {
  return (
    <Styled>
      <Title level={3}>Filter</Title>

      <div className="filter_body">
        <Text type="secondary" className="sub_title">
          LOYIHALAR
        </Text>
        <Space direction="vertical" className="checkboxes">
          <Checkbox>PDP EcoSystem</Checkbox>
          <Checkbox>PDP University</Checkbox>
          <Checkbox>PDP School</Checkbox>
          <Checkbox>PDP Junior</Checkbox>
          <Checkbox>PDP Online</Checkbox>
          <Checkbox>PDP Unicorn</Checkbox>
        </Space>
        <Text type="secondary" className="sub_title">
          KATEGORIYALAR
        </Text>
        <Space direction="vertical" className="checkboxes">
          <Checkbox>Sun’iy intellekt</Checkbox>
          <Checkbox>Texnologiyalar</Checkbox>
          <Checkbox>Dasturlash</Checkbox>
          <Checkbox>Frontend</Checkbox>
          <Checkbox>Biznes</Checkbox>
          <Checkbox>Management</Checkbox>
        </Space>
      </div>
    </Styled>
  );
};

export default SidebarFilter;
