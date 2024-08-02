import React from "react";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

const AntdProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b533",
          colorInfo: "#00b533",
          colorSuccess: "#00b533",
          colorLink: "#00b533",
          borderRadius: 6,
        },
      }}
    >
      <StyleProvider hashPriority="low">{children}</StyleProvider>
    </ConfigProvider>
  );
};

export default React.memo(AntdProvider);
