import { App, Button, Flex, message, theme, Typography } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../../services/axios";
import { get } from "lodash";
import { useBoolean } from "hooks/use-boolean";
import AddEditQuestionForm from "./components/add-edit-question-form";
import QuestionsTable from "./components/question-table";
import SurveyForm from "./components/survey-form";
import { ISurvey } from "models";
import { useEffect } from "react";
import { useRouter } from "routes/hooks";
import { MdEdit, MdPublish } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";

const SurveyPage = () => {
  const router = useRouter();
  const params = useParams();
  const editingBool = useBoolean();
  const questionBool = useBoolean();
  const hasToken = useBoolean();
  const [searchParams] = useSearchParams();
  const { modal } = App.useApp();
  const queryClient = useQueryClient();

  const { token } = theme.useToken();

  const { data } = useQuery({
    queryKey: ["survey", params.id],
    queryFn: async () => await axiosInstance.get(endpoints.survey.one(params.id as string)),
    enabled: hasToken.value,
  });

  const survey: ISurvey = get(data, "data.data", {});
  const editable = !survey.published;

  const confirmPublish = (surveyId: string) => () => {
    modal.confirm({
      title: "So‘rovnomani chop etish",
      content: "So‘rovnoma chop etilgandan keyin uni tahrirlay olmaysiz. Haqiqatan ham chop etmoqchimisiz?",
      onOk: async () =>
        await axiosInstance
          .post(endpoints.survey.publish(surveyId))
          .then(() => {
            queryClient.invalidateQueries({ queryKey: ["survey", surveyId] });
            message.success("So'rovnoma muvaffaqqiyatli chop etildi!");
          })
          .catch(() => ""),
      okText: "Ha",
      cancelText: "Yo'q",
    });
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      hasToken.onTrue(token);
      axiosInstance.defaults.headers.common.Authorization = token;
    } else {
      hasToken.onFalse();
      axiosInstance.defaults.headers.common.Authorization = null;
      router.back();
    }
  }, [hasToken, router, searchParams]);

  return (
    <div className="pb-10">
      <Flex className="mb-4" justify="space-between" align="flex-end">
        <Typography.Title className="flex gap-2" level={4}>
          <span className="cursor-pointer" style={{ color: token.colorSuccess }} onClick={() => router.back()}>
            So'rovnomalar
          </span>
          <span>/</span>
          <span className="inline-block max-w-[250PX] text-ellipsis overflow-hidden text-nowrap">{survey.title ? survey.title : "So'rovnoma"}</span>
        </Typography.Title>

        <Flex align="center" gap="10px">
          {!editingBool.value && editable && (
            <Button onClick={editingBool.onTrue} type="dashed" icon={<MdEdit />}>
              Tahrirlash
            </Button>
          )}
          <Button onClick={confirmPublish(survey.id)} disabled={!editable} type="primary" icon={editable ? <MdPublish /> : null}>
            {editable ? "Chop etish" : "Chop etilgan"}
          </Button>
        </Flex>
      </Flex>

      <SurveyForm editingBool={editingBool} survey={survey} />

      <Flex justify="space-between" align="flex-end" className="mb-4">
        <Typography.Title level={4}>So'rovnoma savollari</Typography.Title>
        {editable && (
          <Button icon={<BsPlusCircle />} type="dashed" onClick={() => questionBool.onTrue()}>
            Savol qo'shish
          </Button>
        )}
      </Flex>

      {questionBool.value ? <AddEditQuestionForm survey={survey} questionBool={questionBool} defaultValue={questionBool.data} /> : null}

      <QuestionsTable survey={survey} questionBool={questionBool} />
    </div>
  );
};

export default SurveyPage;
