import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import BlogCard from "pages/home/components/blog-card1/BlogCard1";
import Styled, { NavigationButton } from "./styled";
import { Flex, Space, Typography } from "antd";

const blogData = [
  { image: "/path/to/image1.jpg", title: "Card 1", author: "Odilbek Mirzayev", date: "24.12.2024" },
  { image: "/path/to/image2.jpg", title: "Card 2", author: "Ali Valiyev", date: "25.12.2024" },
  { image: "/path/to/image3.jpg", title: "Card 3", author: "Aziza Karimova", date: "26.12.2024" },
  { image: "/path/to/image1.jpg", title: "Card 1", author: "Odilbek Mirzayev", date: "24.12.2024" },
  { image: "/path/to/image2.jpg", title: "Card 2", author: "Ali Valiyev", date: "25.12.2024" },
  { image: "/path/to/image3.jpg", title: "Card 3", author: "Aziza Karimova", date: "26.12.2024" },
];

const BlogsBlockPage = () => {
  return (
    <Styled>
      <div className="container">
        <Flex justify="space-between" className="block_header">
          <Typography.Title className="title">Blog</Typography.Title>

          <Space>
            <NavigationButton className="custom-prev" style={{ left: "0" }}>
              <LeftOutlined />
            </NavigationButton>
            <NavigationButton className="custom-next" style={{ right: "0" }}>
              <RightOutlined />
            </NavigationButton>
          </Space>
        </Flex>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {blogData.map((blog, index) => (
            <SwiperSlide key={index}>
              <BlogCard {...blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Styled>
  );
};

export default BlogsBlockPage;
