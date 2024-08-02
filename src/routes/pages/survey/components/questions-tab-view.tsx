import React from "react";
import { Typography } from "antd";
import AddEditQuestionForm from "./add-edit-question-form";
import SurveyForm from "./survey-form";
import { useBoolean } from "../../../../hooks/use-boolean";
import QuestionsTable from "./question-table";

interface Props {
  survey: any;
}

const QuestionsTabView: React.FC<Props> = ({ survey }) => {
  const questionBool = useBoolean();

  return (
    <div className="max-w-[900px] mx-auto pb-10">
      <Typography.Title level={4}>So'rovnoma</Typography.Title>
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

export default QuestionsTabView;
