import React, { useEffect } from "react";
import { Form, Input, Button, Select, Space, Card, Checkbox, Radio, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { filter, get, isString } from "lodash";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "../../../../services/axios";
import { BooleanReturnType, useBoolean } from "../../../../hooks/use-boolean";
import { QUESTION_TYPES, QUESTION_TYPES_OPTIONS, TYPE_WITH_ANSWERS } from "utils/constants";

const { Option } = Select;

const AddEditQuestionForm = ({ defaultValue, questionBool, survey }: { survey: any; defaultValue: any; questionBool: BooleanReturnType }) => {
  const [form] = Form.useForm();
  const type = Form.useWatch("type", form);
  const queryClient = useQueryClient();
  const loadingBool = useBoolean();

  const { mutateAsync: createEditOrDeleteAnswer } = useMutation({
    mutationFn: async (data: any) => {
      const endpoint = data.id ? endpoints.surveyQuestionAnswer.update(data.id) : endpoints.surveyQuestionAnswer.add;
      const response = data.id ? await axiosInstance.put(endpoint, data) : await axiosInstance.post(endpoint, data);
      return response;
    },
    onSuccess: () => {
      // Handle success
    },
  });

  const { mutateAsync: deleteAnswer } = useMutation({
    mutationFn: async (id: string) => await axiosInstance.delete(endpoints.surveyQuestionAnswer.delete(id)),
  });

  const { mutate: createOrEditQuestion } = useMutation({
    mutationFn: async ({ data }: any) => (questionBool.data ? await axiosInstance.put(endpoints.surveyQuestion.update(questionBool.data.id), data) : await axiosInstance.post(endpoints.surveyQuestion.add, data)),
    onSuccess: async (data: any, { answers = [] }: any) => {
      const question = get(data, "data.data");

      try {
        if (TYPE_WITH_ANSWERS.has(question.type)) {
          const existingAnswers = get(questionBool, "data.answers", []);

          // Filter out the answers that are not present in the new answers array
          const deletedAnswersIds = filter(existingAnswers, (existingAnswer) => {
            return !answers.find((newAnswer: any) => newAnswer.id === existingAnswer.id);
          }).map((deletedAnAnswer) => deletedAnAnswer.id);

          const promises = [...answers, ...deletedAnswersIds].map((answerOrId: any) => (isString(answerOrId) ? deleteAnswer(answerOrId) : createEditOrDeleteAnswer({ ...answerOrId, questionId: question.id })));
          await Promise.all(promises);
        }

        loadingBool.onFalse();
        questionBool.data && questionBool.onFalse();
        message.success("Muvaffaqqiyatli saqlandi!");
        queryClient.invalidateQueries({ queryKey: ["surveys-list", survey.id] });
      } catch (error) {
        console.log(error);
      }

      form.resetFields();
      form.setFieldValue("type", QUESTION_TYPES.SHORT_ANSWER);
    },
  });

  const onFinish = ({ text, type, answers }: any) => {
    loadingBool.onTrue();
    createOrEditQuestion({ data: { text, type, surveyId: survey.id }, answers });
    console.log("Received values:", answers);
  };

  useEffect(() => {
    if (defaultValue) {
      if (TYPE_WITH_ANSWERS.has(defaultValue.type) && !defaultValue.answers) defaultValue.answers = [];
      form.setFieldsValue(defaultValue);
    } else form.setFieldValue("type", QUESTION_TYPES.SHORT_ANSWER);
  }, [defaultValue, form]);

  return (
    <Form layout="vertical" form={form} name="survey_form" onFinish={onFinish} autoComplete="off">
      <Card className="mb-3">
        <Space style={{ display: "grid", gridTemplateColumns: "auto 200px max-content" }} align="baseline">
          <Form.Item name={"text"} label="Savol matni" rules={[{ required: true, message: "Missing question text" }]}>
            <Input.TextArea autoFocus autoSize={{ minRows: 2 }} placeholder="Savol kiriting" />
          </Form.Item>
          <Form.Item label="Turi" name={"type"} rules={[{ required: true, message: "Missing question type" }]}>
            <Select placeholder="Select a type">
              {QUESTION_TYPES_OPTIONS.map((type) => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Space>

        {TYPE_WITH_ANSWERS.has(type) && (
          <Form.List name={"answers"}>
            {(optionFields, { add: addOption, remove: removeOption }) => (
              <>
                {optionFields.map(({ key, ...optionField }) => (
                  <Space key={key} style={{ display: "grid", gridTemplateColumns: "max-content auto max-content max-content" }} align="baseline">
                    {type === QUESTION_TYPES.CHECKBOXES ? <Checkbox disabled /> : <Radio disabled />}
                    <Form.Item {...optionField} name={[optionField.name, "text"]} rules={[{ required: true, message: "Missing option text" }]}>
                      <Input
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === "Return") {
                            e.preventDefault();
                            addOption();
                          }
                        }}
                        autoFocus
                        placeholder="Option"
                      />
                    </Form.Item>

                    {type !== QUESTION_TYPES.CHECKBOXES && (
                      <Form.Item {...optionField} name={[optionField.name, "hasDescription"]} valuePropName="checked" label={"Majburiy sharx"} layout="horizontal">
                        <Checkbox />
                      </Form.Item>
                    )}
                    <Button danger className="circle" size="small" onClick={() => removeOption(optionField.name)} icon={<MinusCircleOutlined />} type="text" />
                    <Form.Item hidden {...optionField} name={[optionField.name, "id"]}>
                      <Input />
                    </Form.Item>
                  </Space>
                ))}
                <Form.Item className="mb-0">
                  <Button type="dashed" onClick={() => addOption()} icon={<PlusOutlined />}>
                    Javob qoshish
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        )}

        <Form.Item className="flex justify-end mb-0">
          <Space>
            <Button onClick={questionBool.onFalse}>Bekor qilish</Button>
            <Button type="primary" htmlType="submit">
              Saqlash
            </Button>
          </Space>
        </Form.Item>
      </Card>
    </Form>
  );
};

export default AddEditQuestionForm;
