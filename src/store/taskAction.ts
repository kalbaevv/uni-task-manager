import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../request";

export const fetchTasks = createAsyncThunk("taskSlice/fetchTabs", async () => {
  try {
    const { data } = await api.get("/todos?_limit=50");
    return data;
  } catch (error) {
    return error;
  }
});
