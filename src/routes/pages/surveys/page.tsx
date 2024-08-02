import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBoolean } from "../../../hooks/use-boolean";
import axiosInstance, { endpoints } from "../../../services/axios";
import { get } from "lodash";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import dayjs from "dayjs";
import { App, Button, Dropdown, Flex, Menu, Table, Typography } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import Link from "antd/es/typography/Link";
import AddEditSurveyDialog from "./components/add-edit-dialog";

const SurveysPage = () => {
  const modalBool = useBoolean();
  const { modal } = App.useApp();
  const queryClient = useQueryClient();

  const { data: surveysData } = useQuery({
    queryKey: ["surveys-list"],
    queryFn: async () => await axiosInstance.get(endpoints.survey.list),
  });
  const surveys: any[] = get(surveysData, "data.data", []);

  const { mutate: handleDelete } = useMutation({
    mutationFn: async (surveyId: string) => await axiosInstance.delete(endpoints.survey.delete(surveyId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveys-list"] });
    },
  });

  const showConfirmationModal = (id: string) => () => {
    modal.confirm({
      title: "Delete the survey",
      content: "Are you sure you want to delete?",
      onOk: () => handleDelete(id),
      onCancel: () => {},
      okText: "Yes",
      cancelText: "No",
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
      render: (value: any, row: any) => <Link href={`/survey/${row.id}`}>{value}</Link>,
    },
    {
      title: "Boshlanish vaqti",
      dataIndex: "startTime",
      width: 200,
      key: "startTime",
      render: (value: any) => dayjs(value).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "Tugash vaqti",
      dataIndex: "endTime",
      width: 200,
      key: "endTime",
      render: (value: any) => dayjs(value).format("DD MMM YYYY HH:mm"),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "id",
      align: "right" as "right",
      width: 80,
      render: (_: any, row: any) => (
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
              <MenuItem onClick={showConfirmationModal(row.id)} danger icon={<MdOutlineDeleteOutline />}>
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
        <Typography.Title className="mt-0" level={3}>
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
