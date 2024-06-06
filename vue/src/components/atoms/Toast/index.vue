<script lang="ts" setup>
import { computed, ref, watch } from "vue";

type Props = {
  isShown: boolean;
};

/* to give enough time for inspection when presenting */
const PROPS_SHOW_DURATION = 10_000;

const props = defineProps<Props>();
const emit = defineEmits(["clear"]);

/* progress */
const timeProgress = ref<number>(0);
const progressWidth = computed(
  () => `${100 - (timeProgress.value / PROPS_SHOW_DURATION) * 100}%`,
);
const raf = ref<number>();
const rafStartTime = ref<number>();
const rafCallback = (timestamp: number) => {
  if (!rafStartTime.value) {
    rafStartTime.value = timestamp;
  }

  timeProgress.value = timestamp - rafStartTime.value;
  if (timeProgress.value >= PROPS_SHOW_DURATION) {
    emit("clear");
    return;
  }

  raf.value = window.requestAnimationFrame(rafCallback);
};

watch(
  () => props.isShown,
  (isShown) => {
    if (raf.value) window.cancelAnimationFrame(raf.value);
    raf.value = undefined;
    if (!isShown) return;

    raf.value = window.requestAnimationFrame(rafCallback);
  },
);

/* ref expose demonstration */
defineExpose({
  clear: () => {
    if (!props.isShown) return;
    emit("clear");
  },
});
</script>
<template>
  <Teleport to="body">
    <div v-if="isShown" :class="[$style.toast, $style.toast__vue]">
      <slot></slot>
      <div :class="[$style.toast_progress]" :style="{ width: progressWidth }" />
    </div>
  </Teleport>
</template>
<style module>
@import url("common/css/toast.module.css");
</style>
