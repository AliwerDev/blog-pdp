import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, Modal, Space, Typography } from "antd";

import axiosInstance, { endpoints } from "../../../../services/axios";
import { BooleanReturnType } from "../../../../hooks/use-boolean";
import { get } from "lodash";

const AddEditSurveyDialog = ({ modalBool }: { modalBool: BooleanReturnType }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: createOrEditHandler } = useMutation({
    mutationFn: async (data: any) => (modalBool.data ? await axiosInstance.put(endpoints.survey.update(modalBool.data.id), data) : await axiosInstance.post(endpoints.survey.add, data)),
    onSuccess: () => {
      cancel();
    },
  });

  const onFinish = useCallback(
    ({ title, date }: any) => {
      const submitData: any = { title };
      submitData.startTime = dayjs(date[0]).valueOf();
      submitData.endTime = dayjs(date[1]).valueOf();

      createOrEditHandler(submitData);
    },
    [createOrEditHandler]
  );

  const cancel = () => {
    modalBool.onFalse();
    form.resetFields();
    queryClient.invalidateQueries({ queryKey: ["surveys-list"] });
  };

  useEffect(() => {
    if (modalBool.data) {
      form.setFieldsValue({ title: get(modalBool, "data.title"), date: [dayjs(get(modalBool, "data.startTime")), dayjs(get(modalBool, "data.endTime"))] });
    }
  }, [form, modalBool]);

  return (
    <Modal
      open={modalBool.value}
      title={
        <Typography.Title className="m-0" level={5}>
          {modalBool.data ? "So'rovnomani o'zgartirish" : "So'rovnoma yaratish"}
        </Typography.Title>
      }
      closable={false}
      footer={null}
    >
      <Form onFinish={onFinish} form={form} layout="vertical">
        <Form.Item label="Sarlavha" name="title" rules={[{ required: true, message: "Sarlavha kiritish majburiy" }]} required>
          <Input />
        </Form.Item>
        <Form.Item name="date" label="Boshlanish va tugash vaqti" rules={[{ required: true, message: "Vaqt tanlash majburiy" }]} required>
          <DatePicker.RangePicker showSecond={false} needConfirm={false} className="w-full" showTime />
        </Form.Item>

        <Form.Item className="flex justify-end mb-0">
          <Space>
            <Button onClick={cancel}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEditSurveyDialog;
