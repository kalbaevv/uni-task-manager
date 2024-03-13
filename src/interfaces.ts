export interface TodoItem {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
  priority: Priority;
  desc: string;
}
export enum Priority {
  LOW = "low",
  MID = "mid",
  HIGH = "high",
}

export interface ICreateTaskProps {
  show: boolean;
  setShow: (v: boolean) => void;
}
