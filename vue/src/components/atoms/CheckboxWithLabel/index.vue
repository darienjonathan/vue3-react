<script setup lang="ts">
withDefaults(defineProps<{ label: string; isChecked: boolean }>(), {
  isChecked: false,
});

const emit = defineEmits(["check"]);

const handleCheck = (e: Event) => {
  if (!e.target) return;
  emit("check", (e.target as HTMLInputElement).checked);
};
</script>
<template>
  <label :class="$style.checkboxWithLabel">
    <input
      :checked="isChecked"
      :class="$style.checkboxWithLabel_checkbox"
      type="checkbox"
      @change="handleCheck"
    />
    <span>{{ label }}</span>
  </label>
</template>
<style module>
.checkboxWithLabel {
  display: flex;
  align-items: center;
}

.checkboxWithLabel_checkbox {
  margin-inline-start: 8px;
}
</style>
