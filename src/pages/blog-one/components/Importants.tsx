import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "antd";
import { get } from "lodash";
import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axiosInstance from "services/axios";
import { BlogPost, parseNotionResponse } from "utils/helpers";

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
    align-items: center;
    cursor: pointer;

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
  const { data: blogsData } = useQuery({ queryKey: ["blogs"], queryFn: async () => await axiosInstance.get("https://notion.pdp.uz/?database_id=19df4e0aaef380a0938ec4307b2b6b24") });

  const blogs = useMemo(() => {
    let data: BlogPost[] = parseNotionResponse(get(blogsData, "data", []));
    return data.slice(0, 4);
  }, [blogsData]);

  const openBlogOne = (blogId: string) => {
    window.parent.postMessage({ action: "blog-one", blogId }, "*");
  };

  return (
    <Styled>
      <Text className="sub_title">Muhim e’lonlar</Text>

      {blogs.map((blog) => (
        <div onClick={() => openBlogOne(blog.id)} key={blog.id} className="blog_item">
          <LazyLoadImage className="image" src={blog.coverImageUrl} alt="Blog Image" effect="blur" />
          <Typography.Paragraph ellipsis={{ rows: 3 }} className="text">
            {blog.title}
          </Typography.Paragraph>
        </div>
      ))}
    </Styled>
  );
};

export default Importants;
