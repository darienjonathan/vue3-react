<template>
  <section>
    <header :class="$style.header"><slot name="header" /></header>
    <div :class="$style.sprites"><slot name="sprites" /></div>
    <div :class="$style.description"><slot name="description" /></div>
  </section>
</template>
<style module>
.header {
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: rgb(255 0 0 / 0.25);
}

.sprites {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px;
  background-color: rgb(128 0 0 / 0.25);
}

.description {
  padding: 15px;
  background-color: rgb(32 0 0 / 0.25);
}
</style>
