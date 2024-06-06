<script setup lang="ts">
import { computed, ref } from "vue";

const count = ref(0);
const canDecrease = computed(() => count.value > 0);

const increase = () => {
  count.value += 1;
};
const decrease = () => {
  if (count.value <= 0) return;
  count.value -= 1;
};
</script>

<template>
  <div>
    <div :class="$style.count">currentCount: {{ count }}</div>
    <button :class="$style.button" :disabled="!canDecrease" @click="decrease">
      -
    </button>
    <button :class="$style.button" @click="increase">+</button>
  </div>
</template>

<style module>
.count {
  margin-block-end: 10px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}
</style>
