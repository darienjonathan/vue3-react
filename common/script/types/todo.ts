export type Status = "in-progress" | "done"

export type Task = {
  id: string
  name: string
  status: Status
}

export type TabStatus = Status | "all"

export type Tab = {
  status: TabStatus;
  text: string;
};
