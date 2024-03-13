import React, { FC, useEffect } from "react";
import { Button, Drawer, Form, Input, Row, Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { removeTask, setShown, updateTask } from "../../store/taskSlice";
import { Priority } from "../../interfaces";
import { Col, FormProps } from "antd/lib";
import { priorityOptions, statusOptions } from "../../mocks";
import { notification } from "antd";
import styles from "./style.module.css";

type FieldType = {
  title: string;
  desc: string;
  priority: Priority;
  completed: boolean;
};

type NotificationType = "success" | "info" | "warning" | "error";

const TaskDrawer: FC = () => {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.taskManager.isShow);
  const task = useAppSelector((state) => state.taskManager.task);
  const { id, userId } = task;

  const [form] = Form.useForm();

  const close = () => {
    dispatch(setShown(false));
  };

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string,
  ) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onSave: FormProps<FieldType>["onFinish"] = (values) => {
    dispatch(updateTask({ id, ...values, userId }));
    close();
    openNotificationWithIcon(
      "success",
      "Task Updated",
      "The task has been successfully updated.",
    );
  };
  const handleDelete = () => {
    dispatch(removeTask(id));
    openNotificationWithIcon(
      "success",
      "Task Deleted",
      "The task has been successfully deleted.",
    );
    close();
  };

  useEffect(() => {
    form.setFieldsValue(task);
  }, [task]);

  if (!task) {
    return <div>нету таски</div>;
  }
  return (
    <Drawer
      title="Edit task"
      onClose={close}
      open={show}
      className={styles.drawer}
    >
      <Form form={form} layout="vertical" onFinish={onSave}>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="Description">
          <Input />
        </Form.Item>
        <Form.Item name="priority" label="Priority">
          <Select options={priorityOptions} />
        </Form.Item>
        <Form.Item name="completed" label="Status">
          <Select options={statusOptions} />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button danger onClick={handleDelete}>
                Delete
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default TaskDrawer;
