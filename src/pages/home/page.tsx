import { Col, Row } from "antd";
import BlogCard from "./components/blog-card/BlogCard";
import HomeStyled from "./styled";
import { motion } from "framer-motion";
import Typography from "antd/es/typography/Typography";
import { useState } from "react";
import SidebarFilter from "./components/SidebarFilter";

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

const blogData = [
  { image: "/path/to/image1.jpg", title: "Card 1", author: "Odilbek Mirzayev", date: "24.12.2024" },
  { image: "/path/to/image2.jpg", title: "Card 2", author: "Ali Valiyev", date: "25.12.2024" },
  { image: "/path/to/image3.jpg", title: "Card 3", author: "Aziza Karimova", date: "26.12.2024" },
  { image: "/path/to/image1.jpg", title: "Card 1", author: "Odilbek Mirzayev", date: "24.12.2024" },
  { image: "/path/to/image2.jpg", title: "Card 2", author: "Ali Valiyev", date: "25.12.2024" },
  { image: "/path/to/image3.jpg", title: "Card 3", author: "Aziza Karimova", date: "26.12.2024" },
];

const listVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Hamma");

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
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={18}>
          <motion.div initial="hidden" animate="visible" variants={listVariants}>
            <Row gutter={[32, 32]} justify="center">
              {blogData.map((blog, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                  <BlogCard {...blog} />
                </Col>
              ))}
              <Col xs={24}>
                <div className="load_more">Yana ochish</div>
              </Col>
            </Row>
          </motion.div>
        </Col>
        <Col xs={12} lg={6}>
          <SidebarFilter />
        </Col>
      </Row>
    </HomeStyled>
  );
};
export default HomePage;
