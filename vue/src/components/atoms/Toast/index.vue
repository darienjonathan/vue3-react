<script lang="ts" setup>
import { computed, ref, useSlots, watch } from "vue";

/* to give enough time for inspection when presenting */
const PROPS_SHOW_DURATION = 10_000;

const emit = defineEmits(["clear"]);

const slots = useSlots();
const slotContent = computed(() => {
  return slots.default?.().map((vnode) => vnode.children);
});
const isShown = computed(() => !!slotContent.value?.some((v) => !!v));

/* progress */
const timeLeft = ref<number>(PROPS_SHOW_DURATION);
const progressWidth = computed(
  () => `${(timeLeft.value / PROPS_SHOW_DURATION) * 100}%`,
);
const raf = ref<number>();
const rafStartTime = ref<number>();
const rafCallback = (timestamp: number) => {
  if (!rafStartTime.value) {
    rafStartTime.value = timestamp;
  }

  timeLeft.value = PROPS_SHOW_DURATION - (timestamp - rafStartTime.value);
  if (timeLeft.value <= 0) {
    emit("clear");
    return;
  }

  raf.value = window.requestAnimationFrame(rafCallback);
};

watch([isShown, slotContent], () => {
  if (raf.value) window.cancelAnimationFrame(raf.value);
  raf.value = undefined;
  if (!isShown.value) return;

  rafStartTime.value = undefined;
  raf.value = window.requestAnimationFrame(rafCallback);
});

/* ref expose demonstration */
defineExpose({
  clear: () => {
    if (!isShown.value) return;
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
