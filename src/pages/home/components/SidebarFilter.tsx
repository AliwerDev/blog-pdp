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

const SidebarFilter = ({ tags, activeTags, setTegs, categories }: { tags: string[]; activeTags: string[]; categories: string[]; setTegs: (val: string[]) => void }) => {
  const onChangeFilter = (event: any) => {
    if (event?.target?.checked) {
      setTegs([...activeTags, event?.target?.value]);
    } else {
      setTegs(activeTags.filter((t) => t !== event?.target?.value));
    }
  };

  return (
    <Styled>
      <Title level={3}>Filter</Title>

      <div className="filter_body">
        <Text type="secondary" className="sub_title">
          LOYIHALAR
        </Text>
        <Space direction="vertical" className="checkboxes">
          {tags.map((tag) => (
            <Checkbox checked={activeTags.includes(tag)} onChange={onChangeFilter} value={tag} key={tag}>
              {tag}
            </Checkbox>
          ))}
        </Space>
        <Text type="secondary" className="sub_title">
          KATEGORIYALAR
        </Text>
        <Space direction="vertical" className="checkboxes">
          {categories.map((tag) => (
            <Checkbox checked={activeTags.includes(tag)} onChange={onChangeFilter} value={tag} key={tag}>
              {tag}
            </Checkbox>
          ))}
        </Space>
      </div>
    </Styled>
  );
};

export default SidebarFilter;
