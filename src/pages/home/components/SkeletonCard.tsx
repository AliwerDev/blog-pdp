import { Skeleton, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SkeletonCard = () => {
  return (
    <div style={{ width: 300, borderRadius: 10, border: "0" }}>
      <Skeleton.Image style={{ width: "250px", height: 180 }} active />
      <Skeleton active paragraph={{ rows: 2 }} />
      <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        <Avatar icon={<UserOutlined />} size={32} />
        <Skeleton.Input style={{ width: 120, marginLeft: 10 }} active size="small" />
      </div>
    </div>
  );
};

export default SkeletonCard;
