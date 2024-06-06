<script setup lang="ts">
import { computed, ref } from "vue";
import TextInput from "@/components/atoms/TextInput/index.vue";
import Toast from "@/components/atoms/Toast/index.vue";
import { useToast } from "@/components/atoms/Toast/useToast";
import CheckboxWithLabel from "@/components/atoms/CheckboxWithLabel/index.vue";
import type {
  Task,
  TabStatus,
  Tab,
} from "../../../../../common/script/types/todo";

/* Tabs */
const tabs: Tab[] = [
  { status: "all", text: "All" },
  { status: "in-progress", text: "In Progress" },
  { status: "done", text: "Done" },
];
const currentTab = ref<TabStatus>("all");

/* Toast */
const { toastText, clearToast, showToast } = useToast();
const toastRef = ref<InstanceType<typeof Toast>>();
const clearToastManually = () => {
  toastRef.value?.clear();
};

/* Task List */
const tasks = ref<Task[]>([]);
const shownTasks = computed(() =>
  tasks.value.filter((task) => {
    if (currentTab.value === "all") {
      return true;
    }
    return task.status === currentTab.value;
  }),
);

/* Create New Task */
const newTaskName = ref<string>("");
const createNewTask = () => {
  tasks.value.push({
    id: Date.now().toString(),
    name: newTaskName.value,
    status: "in-progress",
  });

  showToast(`Task "${newTaskName.value}" created!`);
  newTaskName.value = "";
};

/* Check Task */
const handleCheck = (id: string, isChecked: boolean) => {
  const task = tasks.value.find((task) => task.id === id);
  if (!task) return;

  task.status = isChecked ? "done" : "in-progress";
  showToast(`Task "${task.name}" ${isChecked ? "completed!" : "in progress!"}`);
};
</script>
<template>
  <h1>Todo App</h1>
  <nav :class="$style.nav">
    <template v-for="tab in tabs" :key="tab.status">
      <div
        :class="{
          [$style.nav_item]: true,
          [$style.nav_item__active]: tab.status === currentTab,
        }"
        @click="currentTab = tab.status"
      >
        {{ tab.text }}
      </div>
    </template>
  </nav>
  <section :class="$style.task_list">
    <template v-if="shownTasks.length > 0">
      <template v-for="task in shownTasks" :key="task.id">
        <CheckboxWithLabel
          :class="$style.task_item"
          :data-checked="task.status === 'done'"
          :is-checked="task.status === 'done'"
          :label="task.name"
          @check="handleCheck(task.id, $event)"
        />
      </template>
    </template>
    <template v-else>
      <span>No tasks</span>
    </template>
  </section>
  <div>
    <TextInput v-model="newTaskName" />
    <button :disabled="!newTaskName" @click="createNewTask">Submit</button>
  </div>
  <button :disabled="!toastText" @click="clearToastManually">
    Clear Toast Manually
  </button>
  <Toast ref="toastRef" :is-shown="!!toastText" @clear="clearToast">{{
    toastText
  }}</Toast>
</template>
<style module>
@import url("common/css/todo.module.css");
</style>
