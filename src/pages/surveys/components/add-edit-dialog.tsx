import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import dayjs from "dayjs";
import { Button, Checkbox, DatePicker, Form, Input, Modal, Select, Space, Typography } from "antd";

import axiosInstance, { endpoints } from "../../../services/axios";
import { BooleanReturnType } from "../../../hooks/use-boolean";
import { get } from "lodash";
import { ISurvey } from "models";

const AddEditSurveyDialog = ({ modalBool, refetch, surveys }: { modalBool: BooleanReturnType; refetch: any; surveys: ISurvey[] }) => {
  const [form] = Form.useForm();
  const isCopy = Form.useWatch("isCopy", form);
  const title = Form.useWatch("title", form);

  const { mutate: createOrEditHandler } = useMutation({
    mutationFn: async (data: any) => {
      if (modalBool.data) {
        return await axiosInstance.put(endpoints.survey.update(modalBool.data.id), data);
      } else if (data.id) {
        return await axiosInstance.post(endpoints.survey.clone, data);
      } else {
        return await axiosInstance.post(endpoints.survey.add, data);
      }
    },
    onSuccess: () => {
      cancel();
    },
  });

  const handleSurveySelect = (id: string) => {
    const survey = surveys.find((survey) => survey.id === id);

    if (!title) {
      form.setFieldsValue({ title: get(survey, "title", "") + " copy" });
    }
  };

  const onFinish = useCallback(
    ({ title, date, isCopy, id }: any) => {
      const submitData: any = { title };
      submitData.startTime = dayjs(date[0]).valueOf();
      submitData.endTime = dayjs(date[1]).valueOf();
      if (isCopy) submitData.id = id;

      createOrEditHandler(submitData);
    },
    [createOrEditHandler]
  );

  const cancel = () => {
    modalBool.onFalse();
    form.resetFields();
    refetch();
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
          <Input.TextArea autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Form.Item name="date" label="Boshlanish va tugash vaqti" rules={[{ required: true, message: "Vaqt tanlash majburiy" }]} required>
          <DatePicker.RangePicker showSecond={false} needConfirm={false} className="w-full" showTime />
        </Form.Item>

        {!modalBool.data && (
          <Form.Item name={"isCopy"} valuePropName="checked" label={"Mavjud so'rovnomadan nusxa olish"} layout="horizontal">
            <Checkbox />
          </Form.Item>
        )}

        {isCopy && !modalBool.data && (
          <Form.Item name="id" className="mt-[-20px]" rules={[{ required: true, message: "So'rovnoma tanlash majburiy" }]}>
            <Select allowClear placeholder="So'rovnomalardan birini tanlang" onSelect={handleSurveySelect}>
              {surveys.map((survey) => (
                <Select.Option key={survey.id} value={survey.id}>
                  {survey.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

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
