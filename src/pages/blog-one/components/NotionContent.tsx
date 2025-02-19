import { useState, useEffect } from "react";

interface NotionContentProps {
  notionUrl: string;
}

const NotionContent: React.FC<NotionContentProps> = ({ notionUrl }) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const fetchNotionContent = async () => {
      try {
        const PROXY_URL = "https://notion-html-proxy.pdpuzinfo.workers.dev";
        const response = await fetch(`${PROXY_URL}/?url=${encodeURIComponent(notionUrl)}`);
        const htmlText = await response.text();

        // HTML dan faqat .layout-content ni ajratish
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, "text/html");
        const layoutContentDiv = doc.querySelector(".layout-content");

        if (layoutContentDiv) {
          setContent(layoutContentDiv.innerHTML);
        } else {
          console.warn("`.layout-content` topilmadi.");
        }
      } catch (error) {
        console.error("Xatolik yuz berdi:", error);
      }
    };

    fetchNotionContent();
  }, [notionUrl]);

  return (
    <div className="notion-container">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default NotionContent;
