<script lang="ts" setup>
import { ref, watch } from "vue";

type Props = {
  isShown: boolean;
};

/* to give enough time for inspection when presenting */
const PROPS_SHOW_DURATION = 10000;

const props = defineProps<Props>();
const emit = defineEmits(["clear"]);

const timer = ref<number>();

watch(
  () => props.isShown,
  (isShown) => {
    clearTimeout(timer.value);
    timer.value = undefined;
    if (!isShown) return;

    timer.value = window.setTimeout(() => {
      emit("clear");
    }, PROPS_SHOW_DURATION);
  },
);
</script>
<template>
  <Teleport to="body">
    <div v-if="isShown" :class="[$style.toast, $style.toast__vue]">
      <slot></slot>
    </div>
  </Teleport>
</template>
<style module>
@import url("common/css/toast.module.css");
</style>
