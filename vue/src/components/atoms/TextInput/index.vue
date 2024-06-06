<script setup lang="ts">
const model = defineModel<string>();
</script>
<template>
  <input v-model="model" type="text" />
</template>
