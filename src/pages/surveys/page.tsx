import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useBoolean } from "../../hooks/use-boolean";
import axiosInstance, { endpoints } from "../../services/axios";
import { get } from "lodash";
import { MdEdit, MdOutlineDeleteOutline, MdPublish } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import dayjs from "dayjs";
import { App, Button, Dropdown, Flex, Menu, Table, Typography } from "antd";
import AddEditSurveyDialog from "./components/add-edit-dialog";

import MenuItem from "antd/es/menu/MenuItem";
import Link from "antd/es/typography/Link";
import { ISurvey } from "models";

const SurveysPage = () => {
  const modalBool = useBoolean();
  const { modal, message } = App.useApp();
  const queryClient = useQueryClient();

  const { data: surveysData } = useQuery({
    queryKey: ["surveys-list"],
    queryFn: async () => await axiosInstance.get(endpoints.survey.list),
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
            queryClient.invalidateQueries({ queryKey: ["surveys-list"] });
            message.success("So'rovnoma muvaffaqqiyatli o'chirildi!");
          })
          .catch(() => ""),

      okText: "Ha",
      cancelText: "Yo'q",
    });
  };

  const confirmPublish = (surveyId: string) => () => {
    modal.confirm({
      title: "So‘rovnomani chop etish",
      content: "So‘rovnoma chop etilgandan keyin uni tahrirlay olmaysiz. Haqiqatan ham chop etmoqchimisiz?",
      onOk: async () =>
        await axiosInstance
          .post(endpoints.survey.publish(surveyId))
          .then(() => {
            queryClient.invalidateQueries({ queryKey: ["surveys-list"] });
            message.success("So'rovnoma muvaffaqqiyatli chop etildi!");
          })
          .catch(() => ""),
      okText: "Ha",
      cancelText: "Yo'q",
    });
  };

  const columns = [
    {
      title: "N",
      dataIndex: "no",
      key: "no",
      render: (_: any, i: any, index: number) => index + 1,
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      render: (value: any, row: any) => <Link href={`/survey/${row.id}`}>{value}</Link>,
    },
    {
      title: "Boshlanish vaqti",
      dataIndex: "startTime",
      width: 180,
      key: "startTime",
      render: (value: any) => dayjs(value).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "Tugash vaqti",
      dataIndex: "endTime",
      width: 180,
      key: "endTime",
      render: (value: any) => dayjs(value).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "Chop etish",
      dataIndex: "published",
      width: 150,
      key: "published",
      render: (value: boolean, row: ISurvey) => (
        <Button onClick={confirmPublish(row.id)} disabled={value} type="dashed" icon={<MdPublish />}>
          {value ? "Chop etilgan" : "Chop etish"}
        </Button>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "id",
      align: "right" as "right",
      width: 80,
      render: (_: any, row: ISurvey) => (
        <Dropdown
          dropdownRender={() => (
            <Menu>
              <MenuItem
                onClick={() => {
                  modalBool.onTrue(row);
                }}
                icon={<MdEdit />}
              >
                Taxrirlash
              </MenuItem>
              <MenuItem onClick={confirmDelete(row.id)} danger icon={<MdOutlineDeleteOutline />}>
                O'chirish
              </MenuItem>
            </Menu>
          )}
          placement="bottomRight"
        >
          <Button size="small" type="text" icon={<BsThreeDotsVertical />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-2">
      <Flex align="center" justify="space-between" className="my-3">
        <Typography.Title className="mt-0" level={4}>
          So'rovnomalar
        </Typography.Title>
        <Button type="primary" onClick={() => modalBool.onTrue()}>
          + Yangi qo'shish
        </Button>
      </Flex>

      <Table pagination={false} dataSource={surveys} columns={columns} />

      <AddEditSurveyDialog modalBool={modalBool} />
    </div>
  );
};

export default SurveysPage;
