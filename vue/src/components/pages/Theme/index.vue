<script setup lang="ts">
import { useInjectTheme } from "@/composables/contexts/useProvideTheme";
import { onMounted, onUnmounted } from "vue";

const { setDefaultTheme, toggleTheme } = useInjectTheme();

onMounted(setDefaultTheme);
onUnmounted(setDefaultTheme);
</script>
<template>
  <div>
    <button @click="toggleTheme">toggle theme</button>
  </div>
</template>
