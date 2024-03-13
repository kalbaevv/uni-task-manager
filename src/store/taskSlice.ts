import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTasks } from "./taskAction";
import { Priority, TodoItem } from "../interfaces";

interface TaskState {
  tasks: {
    todo: TodoItem[];
    done: TodoItem[];
  };
  task: TodoItem;
  isShow: boolean;
}

const initialState: TaskState = {
  tasks: {
    todo: [],
    done: [],
  },
  task: {
    priority: Priority.LOW,
    title: "",
    desc: "",
    id: 0,
    userId: 0,
    completed: false,
  },
  isShow: false,
};

export const taskManagerSlice = createSlice({
  name: "taskManager",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<TodoItem[]>) => {
        const data = action.payload;
        const priorities = ["mid", "low", "high"];
        state.tasks = data.reduce(
          (acc: any, cur: TodoItem) => {
            if (cur.completed) {
              acc.done.push({
                ...cur,
                desc: `${cur.id}  message to Vitalik about feedback`,
                priority:
                  priorities[Math.floor(priorities.length * Math.random())],
              });
            } else {
              acc.todo.push({
                ...cur,
                desc: `${cur.id} message to Igor about feedback`,
                priority:
                  priorities[Math.floor(priorities.length * Math.random())],
              });
            }
            return acc;
          },
          { todo: [], done: [] },
        );
      },
    );
  },
  reducers: {
    setCurrentTask: (state, action) => {
      state.task = action.payload;
    },
    setShown: (state, action) => {
      state.isShow = action.payload;
    },
    toggleTab: (
      state,
      action: PayloadAction<{
        key: string;
        indexOfTask: number;
        item: TodoItem;
      }>,
    ) => {
      const { key, item, indexOfTask } = action.payload;
      if (key !== "Todo") {
        const newRowIndex = state.tasks.done.findIndex((todo) => {
          return todo.id === item.id;
        });
        state.tasks.todo.splice(indexOfTask, 1);
        state.tasks.done.splice(newRowIndex, 0, state.task);
      } else {
        const newRowIndex = state.tasks.todo.findIndex((todo) => {
          return todo.id === item.id;
        });
        state.tasks.done.splice(indexOfTask, 1);

        state.tasks.todo.splice(newRowIndex, 0, state.task);
      }
    },
    updateTask: (state, action: PayloadAction<TodoItem>) => {
      const updatedTask = action.payload;
      if (updatedTask.completed) {
        const index = state.tasks.todo.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (index !== -1) {
          state.tasks.todo.splice(index, 1);
          state.tasks.done.push(updatedTask);
        } else {
          const doneIndex = state.tasks.done.findIndex(
            (task) => task.id === updatedTask.id,
          );
          if (doneIndex !== -1) {
            state.tasks.done[doneIndex] = updatedTask;
          }
        }
      } else {
        const index = state.tasks.done.findIndex(
          (task) => task.id === updatedTask.id,
        );
        if (index !== -1) {
          state.tasks.done.splice(index, 1);
          state.tasks.todo.push(updatedTask);
        } else {
          const todoIndex = state.tasks.todo.findIndex(
            (task) => task.id === updatedTask.id,
          );
          if (todoIndex !== -1) {
            state.tasks.todo[todoIndex] = updatedTask;
          }
        }
      }
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks.todo = state.tasks.todo.filter(
        (task) => task.id !== action.payload,
      );
      state.tasks.done = state.tasks.done.filter(
        (task) => task.id !== action.payload,
      );
    },
    addTask: (state, action: PayloadAction<TodoItem>) => {
      state.tasks.todo.push(action.payload);
    },
    sortByPriority: (state, action) => {
      const { tabKey, priority } = action.payload;
      if (tabKey === "Todo") {
        state.tasks.todo.sort((a, b) => {
          if (a.priority === priority && b.priority !== priority) {
            return -1;
          } else if (a.priority !== priority && b.priority === priority) {
            return 1;
          }
          return 0;
        });
      } else {
        state.tasks.done.sort((a, b) => {
          if (a.priority === priority && b.priority !== priority) {
            return -1;
          } else if (a.priority !== priority && b.priority === priority) {
            return 1;
          }
          return 0;
        });
      }
    },
  },
});

export const {
  setCurrentTask,
  setShown,
  toggleTab,
  updateTask,
  removeTask,
  addTask,
  sortByPriority,
} = taskManagerSlice.actions;

export default taskManagerSlice.reducer;
