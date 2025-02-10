import { Alert, Button, Flex, message, Modal, TreeSelect, Typography } from "antd";
import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import axiosInstance, { endpoints } from "../../../services/axios";
import { BooleanReturnType } from "../../../hooks/use-boolean";
import { get, isString } from "lodash";

const PublishSurveyDialog = ({ modalBool, refetch }: { modalBool: BooleanReturnType; refetch: any }) => {
  const queryClient = useQueryClient();
  const [ids, setIds] = useState<string[]>([]);

  const { data: departmentsData, isFetching } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => await axiosInstance.get(endpoints.department.list),
    enabled: modalBool.value,
  });

  const departments = useMemo(() => {
    const valueLabelMapper = (departments: any[] = [], users: any[] = []): any[] => {
      departments = departments.map((item) => ({
        value: item.ID,
        key: item.ID,
        label: item.NAME,
        title: item.NAME,
        children: valueLabelMapper(item.children, item.users),
        //
      }));

      users = users.map((item) => ({
        value: "userId=" + item.ID,
        key: item.ID,
        label: (item.NAME || "") + " " + (item.LAST_NAME || ""),
        title: (item.NAME || "") + " " + (item.LAST_NAME || ""), //
      }));

      return departments.concat(users);
    };

    return valueLabelMapper(get(departmentsData, "data.result", []), []);
  }, [departmentsData]);

  const { mutate: publishHandler, isPending } = useMutation({
    mutationFn: async (data: any) => await axiosInstance.post(endpoints.survey.publish, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["survey", modalBool.data] });
      message.success("Muvaffaqqiyatli chop etildi!");
      cancel();
    },
  });

  const cancel = () => {
    modalBool.onFalse();
    setIds([]);
    refetch();
  };

  const onFinish = () => {
    const userIdes = ids.filter((id) => isString(id) && id.startsWith("userId=")).map((id) => id.slice(7));
    publishHandler({ userIdes, surveyId: modalBool.data });
  };

  return (
    <Modal
      open={modalBool.value}
      title={
        <Typography.Title className="m-0" level={5}>
          So'rovnomani chop etish
        </Typography.Title>
      }
      closable={false}
      footer={
        <Flex className="mt-5 gap-2" justify="flex-end">
          <Button onClick={isPending ? () => "" : cancel}>Bekor qilish</Button>
          <Button loading={isPending} type="primary" onClick={onFinish}>
            Chop etish
          </Button>
        </Flex>
      }
    >
      <Alert className="mb-4" showIcon type="warning" message="Unutmang so‘rovnoma chop etilgandan keyin uni tahrirlay olmaysiz!" />

      <TreeSelect
        showCheckedStrategy={TreeSelect.SHOW_ALL}
        loading={isFetching}
        maxTagTextLength={12}
        allowClear
        treeCheckable={true}
        size="large"
        maxTagCount={8}
        listHeight={400}
        treeDefaultExpandedKeys={[1]}
        treeData={departments}
        value={ids}
        onChange={setIds}
        placeholder={"So'rovnoma yuborish uchun departmentlarni tanlang!"}
        style={{ width: "100%" }}
        //
      />
    </Modal>
  );
};

export default PublishSurveyDialog;
