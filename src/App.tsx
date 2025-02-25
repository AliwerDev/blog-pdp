import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp } from "antd";

import Router from "./routes";
import AntProvider from "theme/ant-provider";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// ----------------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 1000,
    },
  },
});
export default function App() {
  const [height, setHeight] = useState(0);
  const location = useLocation();

  // Listen for changes to the document body height.
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    const body = document.querySelector("html");
    if (body) observer.observe(body);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Send a post message to the parent window with the current document body height.
  useEffect(() => {
    const isIframe = window.self !== window.top;
    if (isIframe) {
      document.documentElement.style.overflow = "hidden";
      console.log("Sending height", height, location.pathname);
      window.parent.postMessage({ action: "SET_HEIGHT", pathname: location.pathname, height }, "*");
    } else {
      document.documentElement.style.overflow = "unset";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height]);

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
