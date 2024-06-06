import { useEffect, useState } from "react";
import {
  pokemonNameList,
  itemNameList,
  getPokemon,
  getItem,
} from "../../../../../common/script/const/pokemon";
import type {
  Pokemon as PokemonType,
  Item as ItemType,
} from "../../../../../common/script/types/pokemon";
import styles from "common/css/pokemon.module.css";
import { PokemonSection } from "@/components/atoms/PokemonSection";

const initialize = <T extends { name: string }>(
  list: string[],
  fetchFn: (param: string) => Promise<T>,
  setState: (value: React.SetStateAction<Map<string, T> | undefined>) => void,
) => {
  Promise.all(list.map(fetchFn)).then((items) => {
    setState((prev) => {
      const next = prev || new Map<string, T>();
      items.forEach((item) => {
        next.set(item.name, item);
      });
      return next;
    });
  });
};

const spriteElement = (sprites: Record<string, string>) =>
  Object.entries(sprites)
    .filter(([, v]) => typeof v === "string")
    .map(([key, sprite]) => <img key={key} src={sprite} alt={key} />);

const pokemonDescriptionElement = (pokemon: PokemonType) => (
  <div>
    <div className={[styles.description, styles.description__type].join(" ")}>
      <span className={styles.description_label}>type:</span>
      <span>{pokemon.types.map((type) => type.type.name).join(" / ")}</span>
    </div>
    <div className={[styles.description, styles.description__type].join(" ")}>
      <span className={styles.description_label}>ability:</span>
      <span>
        {pokemon.abilities.map((ability) => ability.ability.name).join(" / ")}
      </span>
    </div>
  </div>
);

const itemDescriptionElement = (item: ItemType) => (
  <div>
    <h4>effect:</h4>
    <ul>
      {item.effect_entries.map((effectEntry) => (
        <li key={effectEntry.effect}>{effectEntry.effect}</li>
      ))}
    </ul>
  </div>
);

export const Pokemon: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Map<string, PokemonType>>();
  const [itemList, setItemList] = useState<Map<string, ItemType>>();

  /* initialization */
  useEffect(() => {
    initialize(pokemonNameList, getPokemon, setPokemonList);
    initialize(itemNameList, getItem, setItemList);
  }, []);

  return (
    <div>
      <h2>Pokemon</h2>
      <div className={styles.grid}>
        <div>
          <h3>Pokemon List</h3>
          {[...(pokemonList?.values() || [])].map((pokemon: PokemonType) => (
            <PokemonSection
              key={pokemon.name}
              HeaderElement={pokemon.name}
              SpritesElement={spriteElement(pokemon.sprites)}
              DescriptionElement={pokemonDescriptionElement(pokemon)}
            />
          ))}
        </div>
        <div>
          <h3>Item List</h3>
          {[...(itemList?.values() || [])].map((item: ItemType) => (
            <PokemonSection
              key={item.name}
              HeaderElement={item.name}
              SpritesElement={spriteElement(item.sprites)}
              DescriptionElement={itemDescriptionElement(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
