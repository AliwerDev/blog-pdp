import { useCallback, useEffect } from "react";
import { Form, Input, Button, Space, Card, DatePicker, Flex, message, Typography, Row, Col } from "antd";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../../../services/axios";
import { BooleanReturnType } from "hooks/use-boolean";

const SurveyForm = ({ survey, editingBool }: { survey: any; editingBool: BooleanReturnType }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: editSurvey, isPending } = useMutation({
    mutationFn: async (data: any) => await axiosInstance.put(endpoints.survey.update(survey.id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["survey", survey.id] });
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

  return (
    <Card bordered={false} className="mb-3" size="small">
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
                  <Typography.Text type="secondary">Boshlanish va tugash vaqti</Typography.Text>
                  <Typography.Title className="m-0" level={5}>
                    {dayjs(survey.startTime).format("DD MMM YYYY HH:mm")} - {dayjs(survey.endTime).format("DD MMM YYYY HH:mm")}
                  </Typography.Title>
                </Space>
              </Col>
            </>
          )}
        </Row>

        {editingBool.value && (
          <Flex justify="flex-end" gap={10}>
            <Button onClick={editingBool.onFalse}>Bekor qilish</Button>
            <Button loading={isPending} type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Flex>
        )}
      </Form>
    </Card>
  );
};

export default SurveyForm;
