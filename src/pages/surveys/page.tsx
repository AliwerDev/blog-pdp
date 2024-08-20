import { useQuery } from "@tanstack/react-query";
import { useBoolean } from "../../hooks/use-boolean";
import axiosInstance, { downloadFile, endpoints } from "../../services/axios";
import { get } from "lodash";
import { MdDownload, MdEdit, MdOutlineDeleteOutline, MdPublish } from "react-icons/md";
import { BsCheckCircle, BsThreeDotsVertical } from "react-icons/bs";
import dayjs from "dayjs";
import { App, Button, Dropdown, Flex, Menu, message, Table, Typography } from "antd";
import AddEditSurveyDialog from "./components/add-edit-dialog";
import { ISurvey } from "models";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PublishSurveyDialog from "./components/publish-dialog";

const SurveysPage = () => {
  const modalBool = useBoolean();
  const publishBool = useBoolean();
  const [messageApi, contextHolder] = message.useMessage();
  const { modal } = App.useApp();
  const [searchParams] = useSearchParams();
  const hasToken = useBoolean();

  const {
    data: surveysData,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["surveys-list"],
    queryFn: async () => await axiosInstance.get(endpoints.survey.list),
    enabled: false,
  });

  const surveys: any[] = get(surveysData, "data.data", []);

  const confirmDelete = (surveyId: string) => () => {
    modal.confirm({
      title: "So'rovnomani o'chirib tashlash",
      content: "So'rovnoma o'chirilgandan so'ng uni qayta tiklay olmaysiz. Haqiqatan ham oʻchirib tashlamoqchimisiz?",
      onOk: async () =>
        await axiosInstance
          .delete(endpoints.survey.delete(surveyId))
          .then(() => {
            refetch();
            message.success("So'rovnoma muvaffaqqiyatli o'chirildi!");
          })
          .catch(() => ""),

      okText: "Ha",
      cancelText: "Yo'q",
    });
  };

  const downloadExcel = (survey: ISurvey) => async () => {
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

  const columns = [
    {
      title: "№",
      dataIndex: "no",
      render: (_: any, i: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      width: 200,
      render: (value: any, row: any) => <Link to={`/survey/${row.id}?token=${hasToken.data}`}>{value}</Link>,
    },
    {
      title: "Boshlanish vaqti",
      dataIndex: "startTime",
      width: 180,
      render: (value: any) => dayjs(value).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "Tugash vaqti",
      dataIndex: "endTime",
      width: 180,
      render: (value: any) => dayjs(value).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "Natijalar",
      dataIndex: "id",
      width: 150,
      render: (_: boolean, row: ISurvey) => (
        <Button onClick={downloadExcel(row)} disabled={!row.published} type="dashed" icon={<MdDownload />}>
          Yuklab olish
        </Button>
      ),
    },
    {
      title: "Chop etish",
      dataIndex: "published",
      width: 150,
      render: (value: boolean, row: ISurvey) => (
        <Button onClick={() => publishBool.onTrue(row.id)} disabled={value} type="primary" icon={value ? <BsCheckCircle /> : <MdPublish />}>
          {value ? "Chop etilgan" : "Chop etish"}
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "id",
      align: "right" as "right",
      width: 50,
      render: (_: any, row: ISurvey) => (
        <Dropdown
          dropdownRender={() => (
            <Menu
              items={[
                { key: "edit", label: "Tahrirlash", onClick: () => modalBool.onTrue(row), icon: <MdEdit /> },
                { key: "delete", label: "O'chirish", onClick: confirmDelete(row.id), icon: <MdOutlineDeleteOutline />, danger: true },
              ]}
            />
          )}
          placement="bottomRight"
        >
          <Button size="small" type="text" icon={<BsThreeDotsVertical />} />
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      hasToken.onTrue(token);
      axiosInstance.defaults.headers.common.Authorization = token;
      console.log("all");

      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("token")]);

  return (
    <div className="p-2">
      {contextHolder}
      <Flex align="center" justify="space-between" className="my-3">
        <Typography.Title className="mt-0" level={4}>
          So'rovnomalar
        </Typography.Title>
        <Button type="primary" onClick={() => modalBool.onTrue()}>
          + Yangi qo'shish
        </Button>
      </Flex>

      <Table loading={isFetching} rowKey={"id"} pagination={false} dataSource={surveys} columns={columns} />

      <PublishSurveyDialog refetch={refetch} modalBool={publishBool} />
      <AddEditSurveyDialog refetch={refetch} modalBool={modalBool} />
    </div>
  );
};

export default SurveysPage;
