<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { links } from "../../common/script/const/route/const";

const route = useRoute();
const activeLink = computed(() => links.find((link) => link.to === route.path));
</script>

<template>
  <div :class="$style.app">
    <header :class="[$style.app_header, $style.header]">
      <div :class="[$style.header_label, $style.header_label__vue]">Vue</div>
      <div :class="$style.header_text">シンプルなvue3とReact比較</div>
    </header>
    <aside :class="$style.app_aside">
      <div :class="$style.link_activeRoute">
        <div>Active route:</div>
        <div>{{ activeLink?.to }}</div>
      </div>
      <nav :class="$style.link_list">
        <template v-for="{ to, text } in links" :key="to">
          <router-link
            :to="to"
            :class="[
              $style.link_item,
              to === activeLink?.to ? $style.link_item__active : '',
            ]"
          >
            {{ text }}
          </router-link>
        </template>
      </nav>
    </aside>
    <main :class="$style.app_main"><router-view /></main>
  </div>
</template>

<style module>
@import url("common/css/app.module.css");
</style>
