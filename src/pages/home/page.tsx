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
import { useTranslation } from "react-i18next";
// import SkeletonCard from "./components/SkeletonCard";

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
  const { t } = useTranslation();
  const [tags, setTags] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("Hamma");
  const [activeTags, setSelectedTags] = useState<string[]>([]);

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
    let data = parseNotionResponse(get(blogsData, "data", []));

    const getTags = () => {
      const tags = new Set<string>();
      const categories = new Set<string>();
      data?.forEach((blog) => {
        categories.add(blog.category);
        blog.tags.forEach((tag) => tags.add(tag));
      });

      return [Array.from(tags), Array.from(categories)];
    };

    setTags(getTags()[0]);
    setCategories(getTags()[1]);

    if (activeTab !== "Hamma") data = data.filter((blog) => blog?.tags?.find((t) => lowerCase(t) === lowerCase(activeTab)));

    if (!isEmpty(activeTags))
      data = data?.filter((blog) => {
        if (activeTags.find((t) => lowerCase(t) === lowerCase(blog.category))) return true;

        for (const tag of blog.tags) {
          if (activeTags.find((t) => lowerCase(t) === lowerCase(tag))) return true;
        }
        return false;
      });
    return data;
  }, [blogsData, activeTags, activeTab]);

  return (
    <HomeStyled>
      <div className="container">
        <Typography className="page_title">{t("Group")}</Typography>
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
              <Row gutter={[32, 32]} justify="start">
                {/* {isLoading &&
                  new Array(4).fill("").map((_, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                      <SkeletonCard />
                    </Col>
                  ))} */}

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
            <SidebarFilter activeTags={activeTags} tags={tags} categories={categories} setTegs={setSelectedTags} />
          </Col>
        </Row>
      </div>
    </HomeStyled>
  );
};

export default HomePage;
