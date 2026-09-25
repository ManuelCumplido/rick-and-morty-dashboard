import { getCharacters } from "@/src/characters/actions/get-characters";
import { CharactersInfiniteScroll } from "@/src/characters/components/CharactersInfiniteScroll";
import { cacheLife } from "next/cache";

export const metadata = {
  title: "Rick and Morty Characters",
  description: "Listado de personajes de Rick and Morty con scroll infinito",
}


export default async function RickAndMortyPage() {
  'use cache';
  cacheLife({
    stale: 60 * 60 * 24 * 25, // 25 days in seconds
    revalidate: 60 * 60 * 24 * 28, // 28 days in seconds
    expire: 60 * 60 * 24 * 30, // 30 days in seconds
  })



  const characters = await getCharacters(1);

  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">
        Listado de Personajes <small className="text-blue-500">estatico</small>
      </span>
      
      <CharactersInfiniteScroll initialCharacters={characters} />

    </div>
  );
}