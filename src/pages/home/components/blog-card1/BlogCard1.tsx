import React from "react";
import styled from "@emotion/styled";
import { Avatar, Flex, Typography } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { BlogPost } from "../blog-card/BlogCard";
import dayjs from "dayjs";

const BlogCardWrapper = styled(motion.div)`
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  padding: 15px;
  background: white;
  box-sizing: border-box;

  .image {
    width: 100%;
    object-fit: cover;
    border-radius: 7px;
  }

  .content {
    .card_header {
      margin-bottom: 16px;
      .tags {
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
      .date {
        color: #9b9b9b;
        font-size: 13px;
      }
    }
    .author-info {
      display: flex;
      margin: 10px 0;
      align-items: center;
      gap: 5px;
      font-size: 13px;
      color: #9b9b9b;
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
  }
`;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const BlogCard: React.FC<BlogPost> = ({ coverImageUrl, content, tags, title, author, date }) => {
  return (
    <Link to="/blog/123123">
      <BlogCardWrapper variants={cardVariants}>
        <div className="content">
          <Flex align="center" justify="space-between" className="card_header">
            <div className="tags">
              {tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <span className="date">
              <CalendarOutlined /> {dayjs(date).format("DD.MM.YYYY")}
            </span>
          </Flex>
          <LazyLoadImage className="image" src={coverImageUrl} alt="Blog Image" effect="blur" />
          <div className="author-info">
            <Avatar src={author.avatarUrl} size="small" icon={<UserOutlined />} />
            <span>{author.fullname}</span>
          </div>
          <Typography.Paragraph ellipsis={{ rows: 2 }} className="title">
            {title}
          </Typography.Paragraph>
          <Typography.Paragraph ellipsis={{ rows: 4 }} className="description">
            {content}
          </Typography.Paragraph>
        </div>
      </BlogCardWrapper>
    </Link>
  );
};

export default BlogCard;
