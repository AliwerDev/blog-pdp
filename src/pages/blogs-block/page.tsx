import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import BlogCard from "pages/home/components/blog-card1/BlogCard1";
import Styled, { NavigationButton } from "./styled";
import { Flex, Space, Typography } from "antd";
import { BlogPost, parseNotionResponse } from "utils/helpers";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "lodash";
import axiosInstance from "services/axios";

const BlogsBlockPage = () => {
  const { data: blogsData } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () =>
      await axiosInstance.post("https://notion-api.pdp.uz/?database_id=19df4e0aaef380a0938ec4307b2b6b24", {
        sorts: [
          {
            property: "Created time",
            direction: "descending",
          },
        ],
      }),
  });

  const blogs = useMemo(() => {
    let data: BlogPost[] = parseNotionResponse(get(blogsData, "data", []));
    return data;
  }, [blogsData]);

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
          {blogs.map((blog, index) => (
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
