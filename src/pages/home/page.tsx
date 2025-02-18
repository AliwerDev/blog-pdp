import { Col, Row } from "antd";
import BlogCard from "./components/blog-card/BlogCard";
import HomeStyled from "./styled";
import { motion } from "framer-motion";
import Typography from "antd/es/typography/Typography";
import { useMemo, useState } from "react";
import SidebarFilter from "./components/SidebarFilter";
import { parseNotionResponse } from "utils/helpers";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "services/axios";
import { get, isEmpty, lowerCase } from "lodash";

const companies = [
  {
    name: "Hamma",
    active: true,
    color: "black",
    textColor: "white",
  },
  {
    name: "PDP EcoSystem",
    active: false,
    color: "lightgray",
    textColor: "darkgray",
  },
  {
    name: "PDP University",
    active: false,
    color: "lightgray",
    textColor: "darkgray",
  },
  {
    name: "PDP Academy",
    active: false,
    color: "lightgray",
    textColor: "darkgray",
  },
  {
    name: "PDP School",
    active: false,
    color: "lightgray",
    textColor: "darkgray",
  },
];

const listVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const HomePage = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Hamma");
  const [activeTags, setSelectedTags] = useState<string[]>([]);
  const { data: blogsData } = useQuery({ queryKey: ["blogs"], queryFn: async () => await axiosInstance.get("https://notion.pdp.uz/") });

  const blogs = useMemo(() => {
    let data = parseNotionResponse(get(blogsData, "data", []));

    const getTags = () => {
      const set = new Set<string>();
      data?.forEach((blog) => {
        blog.tags.forEach((tag) => set.add(tag));
      });

      return Array.from(set);
    };
    setTags(getTags());
    if (activeTab !== "Hamma") data = data.filter((blog) => blog?.tags?.find((t) => lowerCase(t) === lowerCase(activeTab)));

    if (!isEmpty(activeTags))
      data = data?.filter((blog) => {
        for (const tag of blog.tags) {
          if (activeTags.find((t) => lowerCase(t) === lowerCase(tag))) return true;
        }
        return false;
      });
    return data;
  }, [blogsData, activeTags, activeTab]);

  return (
    <HomeStyled>
      <Typography className="page_title">Blog</Typography>
      <div className="tabs">
        {companies.map((item) => (
          <div onClick={() => setActiveTab(item.name)} className={`tab ${activeTab === item.name ? "active" : ""}`} key={item.name}>
            {item.name}
          </div>
        ))}
      </div>
      <Row gutter={[32, 32]} justify="start">
        <Col xs={24} lg={18}>
          <motion.div initial="hidden" animate="visible" variants={listVariants}>
            <Row gutter={[32, 32]} justify="center">
              {blogs.map((blog, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <BlogCard {...blog} />
                </Col>
              ))}
              {/* <Col xs={24}>
                <div className="load_more">Yana ochish</div>
              </Col> */}
            </Row>
          </motion.div>
        </Col>
        <Col xs={12} lg={6}>
          <SidebarFilter activeTags={activeTags} tags={tags} setTegs={setSelectedTags} />
        </Col>
      </Row>
    </HomeStyled>
  );
};

export default HomePage;
