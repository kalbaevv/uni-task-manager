import styles from "./style.module.css";
import React, { FC, useState } from "react";
import { Priority, TodoItem } from "../../interfaces";
import { Row, Tag, Space, Button, Dropdown } from "antd";
import { Divider, Typography } from "antd/lib";
import { useAppDispatch } from "../../store";
import {
  setCurrentTask,
  setShown,
  sortByPriority,
  toggleTab,
} from "../../store/taskSlice";
import { items } from "../../mocks";
interface ITaskTabProps {
  title: string;
  tasks: TodoItem[];
  tabKey: string;
}

export const TaskTab: FC<ITaskTabProps> = ({ title, tasks, tabKey }) => {
  const dispatch = useAppDispatch();
  const [selectedPriority, setSelectedPriority] =
    useState<string>("Sort by priority");
  const selectTask = (task: TodoItem) => {
    dispatch(setShown(true));
    dispatch(setCurrentTask(task));
  };

  const tagColor = (prior: Priority) => {
    let color;
    switch (prior) {
      case Priority.LOW:
        color = "green";
        break;
      case Priority.MID:
        color = "orange";
        break;
      case Priority.HIGH:
        color = "red";
        break;
    }
    return color;
  };

  const dragOverHandler = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    if (target.tagName == "button") {
      target.style.boxShadow = "0 4px 3px gray";
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLElement>) => {
    const target = e.currentTarget;
    target.style.boxShadow = "none";
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLElement>,
    item: TodoItem,
  ) => {
    dispatch(setCurrentTask(item));
    const target = e.currentTarget;
    target.style.boxShadow = "none";
  };
  const dragEndHandler = (e: React.DragEvent<HTMLElement>) => {
    const target = e.currentTarget as HTMLElement;
    target.style.boxShadow = "none";
  };

  const dropHandler = (e: React.DragEvent<HTMLElement>, item: TodoItem) => {
    e.preventDefault();
    const currIndex = tasks.indexOf(item);
    dispatch(toggleTab({ key: tabKey, indexOfTask: currIndex, item }));
  };

  const sortTasksByPriority = ({ key }: { key: string }) => {
    dispatch(sortByPriority({ tabKey, priority: key }));
    setSelectedPriority(key);
  };

  return (
    <>
      <div className={styles.tab}>
        <Row gutter={16} justify={"space-between"}>
          <h1 className={styles.title}> {title}</h1>
          <Dropdown menu={{ items, onClick: sortTasksByPriority }}>
            <Button className={styles.dropdownButton}>
              <Space>{selectedPriority}</Space>
            </Button>
          </Dropdown>
        </Row>
        <Divider className={styles.divider} />
        <Row className={styles.taskBlock}>
          <Space direction={"vertical"} size={25}>
            {tasks?.map((item, index) => (
              <Button
                key={item.id}
                className={styles.button}
                onClick={() => selectTask(item)}
                draggable={true}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, item)}
                onDrop={(e) => dropHandler(e, item)}
              >
                <Row justify={"space-between"} align={"middle"}>
                  <Typography.Text ellipsis className={styles.taskTitle}>
                    {index + 1}.{item.title}
                  </Typography.Text>
                  <Tag className={styles.tag} color={tagColor(item.priority)}>
                    {item.priority}
                  </Tag>
                </Row>
              </Button>
            ))}
          </Space>
        </Row>
      </div>
    </>
  );
};
