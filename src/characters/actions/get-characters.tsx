'use server';

import type { CharactersResponse, SimpleCharacter } from '..';

export const getCharacters = async (
  page = 1
): Promise<SimpleCharacter[]> => {

  const data: CharactersResponse = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  ).then((res) => res.json());

  //throw new Error('Error al obtener los personajes');

  return data.results.map((character) => ({
    id: character.id.toString(),
    name: character.name,
    brand: character.species,
    price: 0,
    image: character.image,
  }));
};