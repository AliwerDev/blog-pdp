import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Button, Flex, message, Modal, TreeSelect, Typography } from "antd";

import axiosInstance, { endpoints } from "../../../services/axios";
import { BooleanReturnType } from "../../../hooks/use-boolean";
import { get } from "lodash";

const PublishSurveyDialog = ({ modalBool, refetch }: { modalBool: BooleanReturnType; refetch: any }) => {
  const queryClient = useQueryClient();
  const [ids, setIds] = useState<string[]>([]);

  const { data: departmentsData } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => await axiosInstance.get(endpoints.department.list),
    enabled: modalBool.value,
  });

  const departments = useMemo(() => {
    const valueLabelMapper = (list: any[]): any[] => {
      return list.map((item) => ({ value: item.ID, key: item.ID, title: item.NAME, children: item.children ? valueLabelMapper(item.children) : undefined }));
    };

    return valueLabelMapper(get(departmentsData, "data.result", []));
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
    publishHandler({ departmentIdes: ids, surveyId: modalBool.data });
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
        {...{
          size: "large",
          maxTagCount: 8,
          listHeight: 400,
          treeDefaultExpandedKeys: [1],
          treeData: departments,
          value: ids,
          onChange: setIds,
          treeCheckable: true,
          placeholder: "So'rovnoma yuborish uchun departmentlarni tanlang!",
          style: {
            width: "100%",
          },
        }}
      />
    </Modal>
  );
};

export default PublishSurveyDialog;
