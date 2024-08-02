import { Layout, Tabs, TabsProps } from "antd";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../../../services/axios";
import { get } from "lodash";
import QuestionsTabView from "./components/questions-tab-view";

const SurveyPage = () => {
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["surveys-list", params.id],
    queryFn: async () => await axiosInstance.get(endpoints.survey.one(params.id as string)),
  });
  const survey: any = get(data, "data.data", []);

  const items: TabsProps["items"] = [
    { key: "1", label: "Savollar", children: <QuestionsTabView survey={survey} /> },
    { key: "2", label: "Responses", children: "Content of Tab Pane 2" },
    { key: "3", label: "Settings", children: "Content of Tab Pane 3" },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <Layout.Content>
      <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} indicator={{ size: (origin) => origin - 20, align: "center" }} />
    </Layout.Content>
  );
};

export default SurveyPage;
