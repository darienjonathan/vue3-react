type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonAbility = {
  ability: {
    name: string;
  };
};

type PokemonSprite = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female?: string;
};

export type Pokemon = {
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprite;
};

type ItemEffectEntry = {
  effect: string;
};

type ItemSprite = {
  default: string;
};

export type Item = {
  name: string;
  effect_entries: ItemEffectEntry[];
  sprites: ItemSprite;
};
