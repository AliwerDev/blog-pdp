import React from "react";
import styled from "@emotion/styled";
import { Avatar, Typography } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { get } from "lodash";
import dayjs from "dayjs";

const BlogCardWrapper = styled(motion.div)`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  .image {
    width: 100%;
    min-height: 180px;
    object-fit: cover;
    border-radius: 7px;
  }

  .content {
    .tags {
      margin: 10px 0;
      display: flex;
      gap: 10px;

      .tag {
        font-size: 12px;
        color: #8e8e8e;
        background-color: #ededed;
        padding: 2px 8px;
        border-radius: 60px;
      }
    }
    .title {
      margin: 5px 0;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.2;
      color: #333;
    }
    .description {
      color: #555;
      line-height: 1.5;
      font-size: 14px;
    }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 16px;
      color: #9b9b9b;
      font-size: 13px;
    }
    .author-info {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: #9b9b9b;
    }
  }
`;

export type BlogPost = {
  author: {
    fullname: string;
    avatarUrl: string;
  };
  title: string;
  content: string;
  coverImageUrl: string;
  tags: string[];
  date: string;
  id: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const BlogCard: React.FC<BlogPost> = ({ id, content, author, coverImageUrl, date, tags, title }) => {
  const openBlogOne = () => {
    window.parent.postMessage({ action: "blog-one", blogId: id }, "*");
  };

  return (
    <BlogCardWrapper onClick={openBlogOne} variants={cardVariants}>
      <LazyLoadImage className="image" src={coverImageUrl} alt="Blog Image" effect="blur" />
      <div className="content">
        {tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
        <Typography.Paragraph ellipsis={{ rows: 2 }} className="title">
          {title}
        </Typography.Paragraph>
        <Typography.Paragraph ellipsis={{ rows: 4 }} className="description">
          {content}
        </Typography.Paragraph>
        <div className="footer">
          <div className="author-info">
            <Avatar src={get(author, "avatarUrl")} size="small" icon={<UserOutlined />} />
            <span>{get(author, "fullname")}</span>
          </div>
          <span>
            <CalendarOutlined /> {dayjs(date).format("DD.MM.YYYY")}
          </span>
        </div>
      </div>
    </BlogCardWrapper>
  );
};

export default BlogCard;
