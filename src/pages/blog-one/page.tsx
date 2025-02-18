import Styled from "./styled";
import { Avatar, Col, Row, Skeleton, Typography } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import "react-lazy-load-image-component/src/effects/blur.css";
import Importants from "./components/Importants";
import { useParams } from "react-router-dom";
import { BlogPost } from "pages/home/components/blog-card/BlogCard";
import { parseNotionResponse } from "utils/helpers";
import { get } from "lodash";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axiosInstance from "services/axios";

const BlogOnePage = () => {
  const params = useParams();
  const { data: blogsData, isLoading } = useQuery({ queryKey: ["blogs"], queryFn: async () => await axiosInstance.get("https://notion.pdp.uz/") });

  const blog = useMemo(() => {
    let data: BlogPost[] = parseNotionResponse(get(blogsData, "data", []));
    return data.find((blog) => blog.id === params.id);
  }, [blogsData, params]);

  return (
    <Styled>
      <div className="container">
        {isLoading ? <Skeleton.Input /> : null}
        <div className="tags">
          {get(blog, "tags", []).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <Row gutter={32}>
          <Col xs={24} lg={18}>
            <div className="content">
              {isLoading ? <Skeleton active /> : null}
              <Typography.Title className="title">{blog?.title}</Typography.Title>

              <div className="info_block">
                <div className="author-info">
                  <Avatar src={get(blog, "author.avatarUrl")} icon={<UserOutlined />} />
                  <span>{get(blog, "author.fullname")}</span>
                </div>
                |
                <span>
                  <CalendarOutlined /> {dayjs(blog?.date).format("DD.MM.YYYY")}
                </span>
              </div>

              {isLoading ? <Skeleton.Image active style={{ height: "300px", width: "400px" }} /> : null}
              <LazyLoadImage className="image" src={blog?.coverImageUrl} alt="Blog Image" effect="blur" />

              {isLoading ? <Skeleton active /> : null}
              <Typography className="text_content">{blog?.content}</Typography>
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <Importants />
          </Col>
        </Row>
      </div>
    </Styled>
  );
};
export default BlogOnePage;
