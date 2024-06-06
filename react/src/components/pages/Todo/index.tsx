import { useMemo, useState } from "react";
import { TextInput } from "@/components/atoms/TextInput";
import { Toast } from "@/components/atoms/Toast";
import { useToast } from "@/components/atoms/Toast/useToast";
import { CheckboxWithLabel } from "@/components/atoms/CheckboxWithLabel";
import styles from "common/css/todo.module.css";
import type {
  Task,
  TabStatus,
  Tab,
} from "../../../../../common/script/types/todo";

const tabs: Tab[] = [
  { status: "all", text: "All" },
  { status: "in-progress", text: "In Progress" },
  { status: "done", text: "Done" },
];

export const Todo: React.FC = () => {
  /* Tabs */
  const [currentTab, setCurrentTab] = useState<TabStatus>("all");

  /* Toast */
  const { toastText, clearToast, showToast } = useToast();

  /* Task List */
  const [tasks, setTasks] = useState<Task[]>([]);
  const shownTasks = useMemo(
    () =>
      tasks.filter((task) => {
        if (currentTab === "all") {
          return true;
        }
        return task.status === currentTab;
      }),
    [currentTab, tasks],
  );

  /* Create New Task */
  const [newTaskName, setNewTaskName] = useState<string>("");
  const handleNewTaskNameChange = (value: string) => {
    setNewTaskName(value);
  };
  const createNewTask = () => {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now().toString(),
        name: newTaskName,
        status: "in-progress",
      },
    ]);

    showToast(`Task "${newTaskName}" created!`);
    setNewTaskName("");
  };

  /* Check Task */
  const handleCheck = (id: string, isChecked: boolean) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    task.status = isChecked ? "done" : "in-progress";
    showToast(
      `Task "${task.name}" ${isChecked ? "completed!" : "in progress!"}`,
    );
  };

  console.log(toastText);

  return (
    <>
      <h1>Todo App</h1>
      <nav className={styles.nav}>
        {tabs.map((tab) => (
          <div
            key={tab.status}
            className={`${styles.nav_item} ${
              tab.status === currentTab ? styles.nav_item__active : ""
            }`}
            onClick={() => {
              setCurrentTab(tab.status);
            }}
          >
            {tab.text}
          </div>
        ))}
      </nav>
      <section className={styles.task_list}>
        {shownTasks.length > 0 ? (
          shownTasks.map((task) => (
            <div
              key={task.id}
              className={styles.task_item}
              data-checked={task.status === "done"}
            >
              <CheckboxWithLabel
                aria-label={task.name}
                isChecked={task.status === "done"}
                label={task.name}
                onCheckboxChange={(isChecked: boolean) => {
                  handleCheck(task.id, isChecked);
                }}
              />
            </div>
          ))
        ) : (
          <span>No tasks</span>
        )}
      </section>
      <div>
        <TextInput value={newTaskName} onChange={handleNewTaskNameChange} />
        <button onClick={createNewTask}>Submit</button>
      </div>
      <Toast isShown={!!toastText} onClear={clearToast}>
        {toastText}
      </Toast>
    </>
  );
};
