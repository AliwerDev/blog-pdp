import Styled from "./styled";
import { Avatar, Col, Row, Skeleton, Typography } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import "react-lazy-load-image-component/src/effects/blur.css";
import Importants from "./components/Importants";
import { useParams } from "react-router-dom";
import { BlogPost, parseNotionPage } from "utils/helpers";
import { get, isEmpty } from "lodash";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import axiosInstance from "services/axios";
import NotionBlocks from "./components/NotionBlocks";

const BlogOnePage = () => {
  const params = useParams();
  const { data, isLoading } = useQuery({ queryKey: ["page-blocks", params.id], queryFn: async () => await axiosInstance.get(`https://notion-page.pdpuzinfo.workers.dev/?page_id=${params.id}`) });

  const blog = useMemo(() => {
    return parseNotionPage(get(data, "data.page")) as BlogPost;
  }, [data]);

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
          <span className="tag">{blog?.category}</span>
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
              {!isEmpty(get(data, "data.blocks")) && <NotionBlocks blocks={get(data, "data.blocks", [])} />}

              {/* <Typography className="text_content">{blog?.content}</Typography> */}
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
