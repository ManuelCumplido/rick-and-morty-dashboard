import { getCharacters } from "@/src/characters/actions/get-characters";
import { CharactersInfiniteScroll } from "@/src/characters/components/CharactersInfiniteScroll";
import { cacheLife } from "next/cache";
import { FavoriteCharacters } from "../../../characters";



export const metadata = {
  title: "Favorites Characters",
  description: "Listado de personajes Favoritos de Rick and Morty",
}


export default async function RickAndMortyPage() {
  //'use cache';
  //cacheLife({
  //  stale: 60 * 60 * 24 * 25, // 25 days in seconds
  //  revalidate: 60 * 60 * 24 * 28, // 28 days in seconds
  //  expire: 60 * 60 * 24 * 30, // 30 days in seconds
  //})
//


  //const characters = await getCharacters(1);

  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">
        Personajes Favoritos <small className="text-blue-500">Global</small>
      </span>
      
      {/* <CharactersInfiniteScroll initialCharacters={characters} /> */}
      <FavoriteCharacters />

    </div>
  );
}

