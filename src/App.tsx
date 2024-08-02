import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from "antd";

import Router from "./routes/sections";
import AntProvider from "theme/ant-provider";

// ----------------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AntProvider>
        <AntdApp>
          <Router />
        </AntdApp>
      </AntProvider>
    </QueryClientProvider>
  );
}
