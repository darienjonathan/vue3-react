import type { Pokemon, Item } from "../../types/pokemon"

const BASE_ROUTE = "https://pokeapi.co/api/v2"

export const pokemonNameList = ['calyrex-shadow', 'rayquaza-mega', 'pikachu']
export const itemNameList = ['sitrus-berry', 'choice-scarf', 'light-ball']

export const getPokemon = async (name: string): Promise<Pokemon> => {
  const response = await fetch(`${BASE_ROUTE}/pokemon/${name}`)
  return response.json()
}
export const getItem = async (name: string): Promise<Item> => {
  const response = await fetch(`${BASE_ROUTE}/item/${name}`)
  return response.json()
}
