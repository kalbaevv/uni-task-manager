import Modal from "antd/lib/modal/Modal";
import { Button, Form, Input, Select } from "antd";
import React, { FC } from "react";
import { priorityOptions } from "../../mocks";
import { useAppDispatch } from "../../store";
import { ICreateTaskProps, Priority } from "../../interfaces";
import { FormProps } from "antd/lib";
import { addTask } from "../../store/taskSlice";

type FieldType = {
  title: string;
  desc: string;
  priority: Priority;
};
export const CreateTask: FC<ICreateTaskProps> = ({ show, setShow }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const submitForm: FormProps<FieldType>["onFinish"] = (values) => {
    console.log(values);
    const id = Math.random();
    const userId = Math.random();
    const data = { ...values, id, userId, completed: false };
    dispatch(addTask(data));
    form.resetFields();
    setShow(false);
  };

  return (
    <Modal open={show} onCancel={() => setShow(false)} footer={null}>
      <Form
        form={form}
        onFinish={submitForm}
        layout="vertical"
        initialValues={{ priority: "low" }}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="desc" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true }]}
        >
          <Select options={priorityOptions} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Modal>
  );
};
