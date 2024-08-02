import React, { useCallback, useEffect } from "react";
import { Form, Input, Button, Space, Card, DatePicker, Flex, message, Typography, Row, Col } from "antd";
import { BooleanReturnType, useBoolean } from "../../../../hooks/use-boolean";
import dayjs from "dayjs";
import { BsPlusCircle } from "react-icons/bs";
import { MdCheck, MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../../../../services/axios";

const SurveyForm = ({ survey, questionBool }: { survey: any; questionBool: BooleanReturnType }) => {
  const [form] = Form.useForm();
  const editingBool = useBoolean();
  const queryClient = useQueryClient();

  const { mutate: editSurvey, isPending } = useMutation({
    mutationFn: async (data: any) => await axiosInstance.put(endpoints.survey.update(survey.id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveys-list", survey.id] });
      editingBool.onFalse();
      message.success("Muvaffaqqiyatli saqlandi!");
    },
  });

  const onFinish = useCallback(
    ({ title, date }: any) => {
      const submitData: any = { title };
      submitData.startTime = dayjs(date[0]).valueOf();
      submitData.endTime = dayjs(date[1]).valueOf();

      editSurvey(submitData);
    },
    [editSurvey]
  );

  useEffect(() => {
    if (survey) form.setFieldsValue({ title: survey.title, date: [dayjs(survey.startTime), dayjs(survey.endTime)] });
  }, [survey, form]);

  const addQuestionEl = !questionBool.value && (
    <Button icon={<BsPlusCircle />} type="dashed" onClick={() => questionBool.onTrue()}>
      Savol qo'shish
    </Button>
  );

  return (
    <Card bordered={false} className="mb-3">
      <Form layout="vertical" form={form} name="survey_form" onFinish={onFinish} autoComplete="off">
        <Row gutter={[10, 10]}>
          {editingBool.value ? (
            <>
              <Col xs={24} md={12}>
                <Form.Item name={"title"} label="So'rovnoma sarlavhasi" rules={[{ required: true, message: "Missing question title" }]}>
                  <Input.TextArea autoSize={{ minRows: 2 }} placeholder="Question Title" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item name="date" label="Boshlanish va tugash vaqti" rules={[{ required: true, message: "Vaqt tanlash majburiy" }]} required>
                  <DatePicker.RangePicker showSecond={false} needConfirm={false} className="w-full" showTime />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Col xs={24} md={12}>
                <Space direction="vertical">
                  <Typography.Text type="secondary">Sarlavhasi</Typography.Text>
                  <Typography.Title className="m-0" level={5}>
                    {survey.title}
                  </Typography.Title>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical">
                  <Typography.Text type="secondary">Vaqti</Typography.Text>
                  <Typography.Title className="m-0" level={5}>
                    {dayjs(survey.startTime).format("DD MMM YYYY HH:mm")} - {dayjs(survey.endTime).format("DD MMM YYYY HH:mm")}
                  </Typography.Title>
                </Space>
              </Col>
            </>
          )}
        </Row>

        {editingBool.value && (
          <Flex justify="flex-end" gap={15}>
            {addQuestionEl}
            <Button loading={isPending} type="primary" htmlType="submit" icon={<MdCheck />}>
              Saqlash
            </Button>
          </Flex>
        )}
      </Form>
      {!editingBool.value && (
        <Flex justify="flex-end" gap={15}>
          {addQuestionEl}
          <Button onClick={editingBool.onTrue} type="primary" htmlType="button" icon={<MdEdit />}>
            Taxrirlash
          </Button>
        </Flex>
      )}
    </Card>
  );
};

export default SurveyForm;
