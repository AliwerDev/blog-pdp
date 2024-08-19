import { Button, Flex, message, theme, Typography } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { downloadFile, endpoints } from "../../services/axios";
import { get } from "lodash";
import { useBoolean } from "hooks/use-boolean";
import AddEditQuestionForm from "./components/add-edit-question-form";
import QuestionsTable from "./components/question-table";
import SurveyForm from "./components/survey-form";
import { ISurvey } from "models";
import { useEffect } from "react";
import { useRouter } from "routes/hooks";
import { MdDownload, MdEdit, MdPublish } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
import PublishSurveyDialog from "pages/surveys/components/publish-dialog";

const SurveyPage = () => {
  const router = useRouter();
  const params = useParams();
  const editingBool = useBoolean();
  const questionBool = useBoolean();
  const publishBool = useBoolean();
  const hasToken = useBoolean();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const accessToken = searchParams.get("token");

  const { token } = theme.useToken();

  const { data } = useQuery({
    queryKey: ["survey", params.id],
    queryFn: async () => await axiosInstance.get(endpoints.survey.one(params.id as string)),
    enabled: hasToken.value,
  });

  const survey: ISurvey = get(data, "data.data", {});
  const editable = !survey.published;

  const downloadExcel = async () => {
    messageApi.open({
      type: "loading",
      content: "Natijalar yuklab olinmoqda!",
      duration: 0,
    });

    try {
      await downloadFile({ url: endpoints.survey.exel(survey.id), fileName: `${survey.title}.xlsx` });
    } catch (error) {}
    messageApi.destroy();
  };

  useEffect(() => {
    if (accessToken) {
      hasToken.onTrue(accessToken);
      axiosInstance.defaults.headers.common.Authorization = accessToken;
    } else {
      hasToken.onFalse();
      axiosInstance.defaults.headers.common.Authorization = null;
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="pb-10">
      {contextHolder}
      <Flex className="mb-4" justify="space-between" align="flex-end">
        <Typography.Title className="flex gap-2" level={4}>
          <span className="cursor-pointer" style={{ color: token.colorSuccess }} onClick={() => router.push(`/?token=${accessToken}`)}>
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

          <Button onClick={() => publishBool.onTrue(survey.id)} disabled={!editable} type="primary" icon={editable ? <MdPublish /> : null}>
            {editable ? "Chop etish" : "Chop etilgan"}
          </Button>

          {!editable ? (
            <Button onClick={downloadExcel} type="dashed" icon={<MdDownload />}>
              Natijalarni yuklab olish
            </Button>
          ) : null}
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

      <PublishSurveyDialog modalBool={publishBool} refetch={() => queryClient.refetchQueries({ queryKey: ["surveys-list"] })} />
      <QuestionsTable survey={survey} questionBool={questionBool} />
    </div>
  );
};

export default SurveyPage;
