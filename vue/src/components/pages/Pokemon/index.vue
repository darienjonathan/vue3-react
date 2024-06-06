<script setup lang="ts">
import { ref } from "vue";
import {
  pokemonNameList,
  itemNameList,
  getPokemon,
  getItem,
} from "../../../../../common/script/const/pokemon";
import type { Pokemon, Item } from "../../../../../common/script/types/pokemon";
import PokemonSection from "@/components/atoms/PokemonSection/index.vue";

const pokemonList = ref<Map<string, Pokemon>>();
const itemList = ref<Map<string, Item>>();

const initialize = async () => {
  const pokemonMap = pokemonList.value || new Map<string, Pokemon>();
  const itemMap = itemList.value || new Map<string, Item>();
  const initializePokemons = Promise.all(pokemonNameList.map(getPokemon)).then(
    (pokemons) => {
      pokemons.forEach((pokemon) => {
        pokemonMap.set(pokemon.name, pokemon);
      });
      pokemonList.value = pokemonMap;
    },
  );
  const initializeItems = Promise.all(itemNameList.map(getItem)).then(
    (items) => {
      items.forEach((item) => {
        itemMap.set(item.name, item);
      });
      itemList.value = itemMap;
    },
  );
  await Promise.all([initializePokemons, initializeItems]);
};

await initialize();

const getSprite = (sprites: Record<string, string>) =>
  Object.entries(sprites).filter(([, sprite]) => typeof sprite === "string");
</script>
<template>
  <div>
    <h2>Pokemon</h2>
    <div :class="$style.grid">
      <div>
        <h3>Pokemon List</h3>
        <template
          v-for="pokemon in [...(pokemonList?.values() || [])]"
          :key="pokemon.name"
        >
          <PokemonSection>
            <template #header>{{ pokemon.name }}</template>
            <template #sprites>
              <template
                v-for="[key, sprite] in getSprite(pokemon.sprites)"
                :key="key"
              >
                <img :src="sprite" :alt="key" />
              </template>
            </template>
            <template #description>
              <div>
                <div :class="[$style.description, $style.description__type]">
                  <span :class="$style.description_label">type:</span>
                  <span>{{
                    pokemon.types.map(({ type }) => type.name).join(" / ")
                  }}</span>
                </div>
                <div :class="[$style.description, $style.description__type]">
                  <span :class="$style.description_label">ability:</span>
                  <span>{{
                    pokemon.abilities
                      .map(({ ability }) => ability.name)
                      .join(" / ")
                  }}</span>
                </div>
              </div>
            </template>
          </PokemonSection>
        </template>
      </div>

      <div>
        <h3>Item List</h3>
        <template
          v-for="item in [...(itemList?.values() || [])]"
          :key="item.name"
        >
          <PokemonSection>
            <template #header>{{ item.name }}</template>
            <template #sprites>
              <template
                v-for="[key, sprite] in getSprite(item.sprites)"
                :key="key"
              >
                <img :src="sprite" :alt="key" />
              </template>
            </template>
            <template #description>
              <div>
                <h4>effect:</h4>
                <ul>
                  <template
                    v-for="effectEntry in item.effect_entries"
                    :key="effectEntry.effect"
                  >
                    <li>{{ effectEntry.effect }}</li>
                  </template>
                </ul>
              </div>
            </template>
          </PokemonSection>
        </template>
      </div>
    </div>
  </div>
</template>
<style module>
@import url("common/css/pokemon.module.css");
</style>
