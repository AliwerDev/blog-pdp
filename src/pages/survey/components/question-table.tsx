import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { HolderOutlined } from "@ant-design/icons";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Checkbox, message, Popconfirm, Space, Table, theme } from "antd";
import type { CheckboxProps, TableColumnsType } from "antd";
import { get } from "lodash";
import { MdDelete, MdEdit } from "react-icons/md";
import { IQuestion, ISurvey } from "models";
import { BooleanReturnType } from "hooks/use-boolean";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance, { endpoints } from "services/axios";
import { QUESTION_TYPES_TITLES } from "utils/constants";

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return <Button type="text" size="small" icon={<HolderOutlined />} style={{ cursor: "move" }} ref={setActivatorNodeRef} {...listeners} />;
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(() => ({ setActivatorNodeRef, listeners }), [setActivatorNodeRef, listeners]);

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

interface Props {
  survey: ISurvey;
  questionBool: BooleanReturnType;
}

const QuestionsTable: React.FC<Props> = ({ survey, questionBool }) => {
  const [dataSource, setDataSource] = React.useState<IQuestion[]>(get(survey, "questions", []));
  const queryClient = useQueryClient();

  const { mutate: editQuestion } = useMutation({
    mutationFn: async (data: IQuestion) => await axiosInstance.put(endpoints.surveyQuestion.update(data.id), data),
    onSuccess: async () => {
      message.success("Muvaffaqqiyatli o'zgartirildi!");
      queryClient.invalidateQueries({ queryKey: ["surveys-list", survey.id] });
    },
  });

  const { mutate: changeOrderIndexes } = useMutation({
    mutationFn: async (data: string[]) => await axiosInstance.post(endpoints.surveyQuestion.changeOrderIndexes, data),
    onSuccess: () => {
      message.success("Muvaffaqqiyatli o'zgartirildi!");
      queryClient.invalidateQueries({ queryKey: ["surveys-list", survey.id] });
    },
  });

  const { mutate: deleteQuestion } = useMutation({
    mutationFn: async (id: string) => await axiosInstance.delete(endpoints.surveyQuestion.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["surveys-list", survey.id] });
      message.success("Muvaffaqqiyatli o'chirildi!");
    },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.id === active?.id);
        const overIndex = prevState.findIndex((record) => record.id === over?.id);
        const updatedDataSource = arrayMove(prevState, activeIndex, overIndex);
        changeOrderIndexes(updatedDataSource.map((i) => i.id));
        return updatedDataSource;
      });
    }
  };

  const handleRequiredChange = useCallback(
    (question: IQuestion): CheckboxProps["onChange"] => {
      return (e) => {
        console.log(e);

        question.required = e.target.checked;
        editQuestion(question);
      };
    },
    [editQuestion]
  );

  useEffect(() => {
    if (get(survey, "questions", [])) {
      setDataSource(get(survey, "questions", []));
    }
  }, [survey]);

  const columns: TableColumnsType<IQuestion> = useMemo(
    () => [
      { key: "sort", align: "center", width: 40, render: () => <DragHandle /> },
      { key: "number", align: "center", title: "N", width: 40, render: (_: any, _1: any, index: number) => index + 1 },
      { title: "Text", dataIndex: "text" },
      { title: "Turi", dataIndex: "type", width: 180, render: (value: string) => get(QUESTION_TYPES_TITLES, value) },
      {
        title: "Majburiy",
        dataIndex: "required",
        width: 120,
        render: (value: boolean, row: IQuestion) => <Checkbox defaultChecked={value} onChange={handleRequiredChange(row)} />,
      },
      {
        title: "",
        align: "right",
        width: 80,
        dataIndex: "actions",
        render: (_: any, row: any) => (
          <Space size="small">
            <Popconfirm title="Savolni ochirish" description="Bu savolni rostdan ham ochirmoqchimisiz?" onConfirm={() => deleteQuestion(row.id)} okText="Ha" cancelText="Yo'q">
              <Button size="small" danger type="text" icon={<MdDelete />} />
            </Popconfirm>
            <Button size="small" onClick={() => questionBool.onTrue(row)} type="text" icon={<MdEdit />} />
          </Space>
        ),
      },
    ],
    [questionBool, deleteQuestion, handleRequiredChange]
  );

  const { token } = theme.useToken();
  const tableStyle = { boxShadow: token.boxShadowTertiary, borderRadius: token.borderRadius, overflow: "hidden" };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      <SortableContext items={dataSource.map((i) => i.id)} strategy={verticalListSortingStrategy}>
        <Table style={tableStyle} size="small" pagination={false} rowKey="id" components={{ body: { row: Row } }} columns={columns} dataSource={dataSource} />
      </SortableContext>
    </DndContext>
  );
};

export default QuestionsTable;
