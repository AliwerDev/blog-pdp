import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import BlogCard from "pages/home/components/blog-card1/BlogCard1";
import Styled, { NavigationButton } from "./styled";
import { Flex, Space, Typography } from "antd";
import { parseNotionResponse } from "utils/helpers";
import { useEffect, useState } from "react";
import { BlogPost } from "pages/home/components/blog-card/BlogCard";

const BlogsBlockPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const blogs = parseNotionResponse({
      object: "list",
      results: [
        {
          object: "page",
          id: "19d5cfa1-7ead-808c-ae74-c9d4457099b7",
          created_time: "2025-02-17T06:30:00.000Z",
          last_edited_time: "2025-02-18T05:23:00.000Z",
          created_by: {
            object: "user",
            id: "3e08622a-10f1-4477-98e0-766bc7165395",
          },
          last_edited_by: {
            object: "user",
            id: "3e08622a-10f1-4477-98e0-766bc7165395",
          },
          cover: null,
          icon: null,
          parent: {
            type: "database_id",
            database_id: "19d5cfa1-7ead-80c0-a89a-ef1ba7645b97",
          },
          archived: false,
          in_trash: false,
          properties: {
            cover: {
              id: "N%3FsL",
              type: "files",
              files: [
                {
                  name: "2024-04-04.jpg",
                  type: "file",
                  file: {
                    url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/55f4da23-a89a-4638-a62c-ac60befd2554/c97ac263-3ccd-4512-9e15-7dc7a30ad600/2024-04-04.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VH5HHPVI%2F20250218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250218T052408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIHWJaDK2SR%2FqWR1fE3DTW4%2BiBciKNPid8S4W8%2FIZn8CeAiAeveK9hOIlK71ZrxMb1yceguHGK%2BhvhUGnIPxNnN4mgSqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMu9HaujT4Nue0G%2BboKtwDfh9XDw0%2BtDjmfmDGGVESUvA6jaek3FGAGiJxf%2Bybk3ZXICzDlrjhTzwi1dAnRGBUwGXZSOmi%2BnLbLBvavfL8Fpx2xNE%2FwgCNHId8EvgFhZtjl7GHOfKo93MGRH03cx9a9l4W7CzSo8tmOZM1aajJ%2BLQQxafZWwlKCLh52JvbzZAtB37RdNo4ZFRjGoAUPM5EQjqoPdlOfPd5eaE4nlxgCMDYwvyvwa2ZqZPB79yOXzxuye0KZKYlBPrfstQHuAJhVsUZlkrkwWYbL%2BJw9erfQ8gW8UEDeq7VqbbUsjg1hodkN7GZzew7Si2xq%2BYNoQ9Z%2Bft6E%2FgdOvABkWZk5SIjQl1VEofTXUo9qRCgtP%2FZbxKVdUtUJW2yCT7WPtyx7SbL4WVdx8jucGPHWhDg%2B%2FZ9k%2FAj4yHD4QiBwAkBCGS6ZiT9yBv5l3KMgguLbpDKMSpuW6Bstd%2BghPeJxmeo9FCtHH5NPNCylqR6ohAHoqo4NYFyYQ1O2x%2FYoOvSn3RuYATmyCrwuFzKXn0YLcIm%2BiXsZApHBebH2JnuMoZsl1sGcgnfcw1Jg7Oq%2FuQTtKj2%2FEIcXFqBxABd7uYCjHhjjcVqJiW1MbYfjtnKVm95M89SLqmmSgmnk5B0joqFnwgwpqjQvQY6pgGs4dE1CrjnFaoqvcQvctu7HHGayxsaBuebt0c8yq43DMxYlHfiLyTS%2FzC5%2F2mV%2F9it3%2FTixXC3qN3UJ8X5LbcUbqxJqIPWz7GLfHMPKSmrweJZKVCRw8a%2Bms2lDTM28zxbbs49V0iLWDmmPdahHsHa7%2BIg2FABuRDQkNRgQBFz3WCIvu37SqZ0IXW3U1qxSyQAsgbrkD8T0EEPx6BvKXzC5Lwd8q1X&X-Amz-Signature=32d3992085b0167300122ff3bfa292a5581222d5a4d4ede6d71ca4056a79e702&X-Amz-SignedHeaders=host&x-id=GetObject",
                    expiry_time: "2025-02-18T06:24:08.795Z",
                  },
                },
              ],
            },
            Author: {
              id: "PXg~",
              type: "people",
              people: [
                {
                  object: "user",
                  id: "3e08622a-10f1-4477-98e0-766bc7165395",
                  name: "Alisher O`rolov",
                  avatar_url: "https://lh3.googleusercontent.com/a/ACg8ocLpfav8hp64u536hn_FtCaKrd07RmbApGMLJuYXn5Ddyg=s100",
                  type: "person",
                  person: {
                    email: "aliwerdev@gmail.com",
                  },
                },
              ],
            },
            "Created time": {
              id: "nm%40g",
              type: "created_time",
              created_time: "2025-02-17T06:30:00.000Z",
            },
            Content: {
              id: "nn%5C%5D",
              type: "rich_text",
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Artificial intelligence has made incredible strides in healthcare, offering new ways to diagnose diseases, predict patient outcomes, and tailor treatments to individual needs. Thanks to AI-powered algorithms, diseases can now be detected at earlier stages, allowing healthcare to become more efficient, cost-effective, and patient-centric.",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "default",
                  },
                  plain_text: "Artificial intelligence has made incredible strides in healthcare, offering new ways to diagnose diseases, predict patient outcomes, and tailor treatments to individual needs. Thanks to AI-powered algorithms, diseases can now be detected at earlier stages, allowing healthcare to become more efficient, cost-effective, and patient-centric.",
                  href: null,
                },
              ],
            },
            Tags: {
              id: "o%40~j",
              type: "multi_select",
              multi_select: [
                {
                  id: "04c4c7f6-9252-44ce-a0bc-242d4ddf0f6c",
                  name: "Pdp academy",
                  color: "orange",
                },
              ],
            },
            title: {
              id: "title",
              type: "title",
              title: [
                {
                  type: "text",
                  text: {
                    content: "Tajribali va fidoyi mutaxassislardan iborat jamoamiz har doim o‘sish va rivojlanishga intiladi",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "default",
                  },
                  plain_text: "Tajribali va fidoyi mutaxassislardan iborat jamoamiz har doim o‘sish va rivojlanishga intiladi",
                  href: null,
                },
              ],
            },
          },
          url: "https://www.notion.so/Tajribali-va-fidoyi-mutaxassislardan-iborat-jamoamiz-har-doim-o-sish-va-rivojlanishga-intiladi-19d5cfa17ead808cae74c9d4457099b7",
          public_url: null,
        },
        {
          object: "page",
          id: "19d5cfa1-7ead-8005-b2fe-e306d6dfc8c4",
          created_time: "2025-02-17T06:22:00.000Z",
          last_edited_time: "2025-02-18T05:23:00.000Z",
          created_by: {
            object: "user",
            id: "3e08622a-10f1-4477-98e0-766bc7165395",
          },
          last_edited_by: {
            object: "user",
            id: "3e08622a-10f1-4477-98e0-766bc7165395",
          },
          cover: null,
          icon: null,
          parent: {
            type: "database_id",
            database_id: "19d5cfa1-7ead-80c0-a89a-ef1ba7645b97",
          },
          archived: false,
          in_trash: false,
          properties: {
            cover: {
              id: "N%3FsL",
              type: "files",
              files: [
                {
                  name: "2024-04-04.jpg",
                  type: "file",
                  file: {
                    url: "https://prod-files-secure.s3.us-west-2.amazonaws.com/55f4da23-a89a-4638-a62c-ac60befd2554/c97ac263-3ccd-4512-9e15-7dc7a30ad600/2024-04-04.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VH5HHPVI%2F20250218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250218T052408Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIHWJaDK2SR%2FqWR1fE3DTW4%2BiBciKNPid8S4W8%2FIZn8CeAiAeveK9hOIlK71ZrxMb1yceguHGK%2BhvhUGnIPxNnN4mgSqIBAiG%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMu9HaujT4Nue0G%2BboKtwDfh9XDw0%2BtDjmfmDGGVESUvA6jaek3FGAGiJxf%2Bybk3ZXICzDlrjhTzwi1dAnRGBUwGXZSOmi%2BnLbLBvavfL8Fpx2xNE%2FwgCNHId8EvgFhZtjl7GHOfKo93MGRH03cx9a9l4W7CzSo8tmOZM1aajJ%2BLQQxafZWwlKCLh52JvbzZAtB37RdNo4ZFRjGoAUPM5EQjqoPdlOfPd5eaE4nlxgCMDYwvyvwa2ZqZPB79yOXzxuye0KZKYlBPrfstQHuAJhVsUZlkrkwWYbL%2BJw9erfQ8gW8UEDeq7VqbbUsjg1hodkN7GZzew7Si2xq%2BYNoQ9Z%2Bft6E%2FgdOvABkWZk5SIjQl1VEofTXUo9qRCgtP%2FZbxKVdUtUJW2yCT7WPtyx7SbL4WVdx8jucGPHWhDg%2B%2FZ9k%2FAj4yHD4QiBwAkBCGS6ZiT9yBv5l3KMgguLbpDKMSpuW6Bstd%2BghPeJxmeo9FCtHH5NPNCylqR6ohAHoqo4NYFyYQ1O2x%2FYoOvSn3RuYATmyCrwuFzKXn0YLcIm%2BiXsZApHBebH2JnuMoZsl1sGcgnfcw1Jg7Oq%2FuQTtKj2%2FEIcXFqBxABd7uYCjHhjjcVqJiW1MbYfjtnKVm95M89SLqmmSgmnk5B0joqFnwgwpqjQvQY6pgGs4dE1CrjnFaoqvcQvctu7HHGayxsaBuebt0c8yq43DMxYlHfiLyTS%2FzC5%2F2mV%2F9it3%2FTixXC3qN3UJ8X5LbcUbqxJqIPWz7GLfHMPKSmrweJZKVCRw8a%2Bms2lDTM28zxbbs49V0iLWDmmPdahHsHa7%2BIg2FABuRDQkNRgQBFz3WCIvu37SqZ0IXW3U1qxSyQAsgbrkD8T0EEPx6BvKXzC5Lwd8q1X&X-Amz-Signature=32d3992085b0167300122ff3bfa292a5581222d5a4d4ede6d71ca4056a79e702&X-Amz-SignedHeaders=host&x-id=GetObject",
                    expiry_time: "2025-02-18T06:24:08.796Z",
                  },
                },
              ],
            },
            Author: {
              id: "PXg~",
              type: "people",
              people: [
                {
                  object: "user",
                  id: "3e08622a-10f1-4477-98e0-766bc7165395",
                  name: "Alisher O`rolov",
                  avatar_url: "https://lh3.googleusercontent.com/a/ACg8ocLpfav8hp64u536hn_FtCaKrd07RmbApGMLJuYXn5Ddyg=s100",
                  type: "person",
                  person: {
                    email: "aliwerdev@gmail.com",
                  },
                },
              ],
            },
            "Created time": {
              id: "nm%40g",
              type: "created_time",
              created_time: "2025-02-17T06:22:00.000Z",
            },
            Content: {
              id: "nn%5C%5D",
              type: "rich_text",
              rich_text: [
                {
                  type: "text",
                  text: {
                    content: "Artificial intelligence has made incredible strides in healthcare, offering new ways to diagnose diseases, predict patient outcomes, and tailor treatments to individual needs. Thanks to AI-powered algorithms, diseases can now be detected at earlier stages, allowing healthcare to become more efficient, cost-effective, and patient-centric.",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "default",
                  },
                  plain_text: "Artificial intelligence has made incredible strides in healthcare, offering new ways to diagnose diseases, predict patient outcomes, and tailor treatments to individual needs. Thanks to AI-powered algorithms, diseases can now be detected at earlier stages, allowing healthcare to become more efficient, cost-effective, and patient-centric.",
                  href: null,
                },
              ],
            },
            Tags: {
              id: "o%40~j",
              type: "multi_select",
              multi_select: [
                {
                  id: "1f73ca74-7f0e-4786-93a8-22a5bd59b91d",
                  name: "Pdp university",
                  color: "brown",
                },
              ],
            },
            title: {
              id: "title",
              type: "title",
              title: [
                {
                  type: "text",
                  text: {
                    content: "Tajribali va fidoyi mutaxassislardan iborat jamoamiz har doim o‘sish va rivojlanishga intiladi",
                    link: null,
                  },
                  annotations: {
                    bold: false,
                    italic: false,
                    strikethrough: false,
                    underline: false,
                    code: false,
                    color: "default",
                  },
                  plain_text: "Tajribali va fidoyi mutaxassislardan iborat jamoamiz har doim o‘sish va rivojlanishga intiladi",
                  href: null,
                },
              ],
            },
          },
          url: "https://www.notion.so/Tajribali-va-fidoyi-mutaxassislardan-iborat-jamoamiz-har-doim-o-sish-va-rivojlanishga-intiladi-19d5cfa17ead8005b2fee306d6dfc8c4",
          public_url: null,
        },
      ],
      next_cursor: null,
      has_more: false,
      type: "page_or_database",
      page_or_database: {},
      developer_survey: "https://notionup.typeform.com/to/bllBsoI4?utm_source=postman",
      request_id: "c777e490-fe5e-4f04-a866-69a2e1c2c8c3",
    });

    setBlogs(blogs);
  }, []);

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
