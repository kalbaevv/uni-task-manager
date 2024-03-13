import React, { useEffect, useState } from "react";
import { Button, Flex, Row } from "antd";
import { TaskTab } from "./components/taskTab";
import { useAppDispatch, useAppSelector } from "./store";
import { fetchTasks } from "./store/taskAction";
import TaskDrawer from "./components/drawer";
import { CreateTask } from "./components/createTask";

const tabs = ["Todo", "Done"];
const App = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskManager.tasks);
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  return (
    <>
      <Flex justify="center" gap={200}>
        {tabs.map((tab) => (
          <TaskTab
            key={tab}
            title={tab}
            tasks={tasks[tab.toLowerCase() as keyof typeof tasks]}
            tabKey={tab}
          />
        ))}
      </Flex>
      <TaskDrawer />
      <CreateTask show={showModal} setShow={setShowModal} />
      <Row justify={"end"}>
        <Button onClick={() => setShowModal(true)}>Add Task</Button>
      </Row>
    </>
  );
};

export default App;
