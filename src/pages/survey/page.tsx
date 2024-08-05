import { theme, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../../services/axios";
import { get } from "lodash";
import { useBoolean } from "hooks/use-boolean";
import AddEditQuestionForm from "./components/add-edit-question-form";
import QuestionsTable from "./components/question-table";
import SurveyForm from "./components/survey-form";
import { ISurvey } from "models";

const SurveyPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const questionBool = useBoolean();

  const { token } = theme.useToken();
  const { data } = useQuery({
    queryKey: ["surveys-list", params.id],
    queryFn: async () => await axiosInstance.get(endpoints.survey.one(params.id as string)),
  });
  const survey: ISurvey = get(data, "data.data", {});

  return (
    <div className="pb-10">
      <Typography.Title className="flex gap-2" level={4}>
        <span className="cursor-pointer" style={{ color: token.colorSuccess }} onClick={() => navigate("/")}>
          So'rovnomalar
        </span>
        <span>/</span>
        <span className="inline-block max-w-[250PX] text-ellipsis overflow-hidden text-nowrap">{survey.title ? survey.title : "So'rovnoma"}</span>
      </Typography.Title>
      <SurveyForm survey={survey} questionBool={questionBool} />

      {questionBool.value ? (
        <>
          <Typography.Title level={4}>{questionBool.data ? "Savolni taxrirlash" : "Savol qo'shish"}</Typography.Title>
          <AddEditQuestionForm survey={survey} questionBool={questionBool} defaultValue={questionBool.data} />
        </>
      ) : null}

      <Typography.Title level={4}>So'rovnoma savollari</Typography.Title>
      <QuestionsTable survey={survey} questionBool={questionBool} />
    </div>
  );
};

export default SurveyPage;
