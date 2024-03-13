import { MenuProps } from "antd";
import { SelectProps } from "antd/lib";

export const statusOptions = [
  { value: false, label: "To Do" },
  { value: true, label: "Done" },
];
export const priorityOptions: SelectProps["options"] = [
  { value: "low", label: "Low" },
  { value: "mid", label: "Mid" },
  { value: "high", label: "High" },
];

export const items: MenuProps["items"] = [
  {
    label: "High",
    key: "high",
  },
  {
    label: "Mid",
    key: "mid",
  },
  {
    label: "Low",
    key: "low",
  },
];
