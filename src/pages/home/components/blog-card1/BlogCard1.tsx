import React from "react";
import styled from "@emotion/styled";
import { Avatar, Flex } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

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

interface BlogCardProps {
  image: string;
  title: string;
  author: string;
  date: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const BlogCard: React.FC<BlogCardProps> = ({ image, title, author, date }) => {
  return (
    <Link to="/blog/123123">
      <BlogCardWrapper variants={cardVariants}>
        <div className="content">
          <Flex align="center" justify="space-between" className="card_header">
            <div className="tags">
              <span className="tag">Texnologiya</span>
            </div>
            <span className="date">
              <CalendarOutlined /> 24.12.2024
            </span>
          </Flex>
          <LazyLoadImage className="image" src={"https://pdp.uz/static/media/2021.59ccb7e4fe11a67fa8e6.jpg"} alt="Blog Image" effect="blur" />
          <div className="author-info">
            <Avatar size="small" icon={<UserOutlined />} />
            <span>Odilbek Mirzayev</span>
          </div>
          <p className="title">PDP Connect loyihasi start berildi, bu texnologik soha</p>
          <p className="description">Integer consequat scelerisque eros, in ultricies sem elementum tempor. Praesent pharetra...</p>
        </div>
      </BlogCardWrapper>
    </Link>
  );
};

export default BlogCard;
