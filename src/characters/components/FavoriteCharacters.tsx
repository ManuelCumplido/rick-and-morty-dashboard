'use client';

import { useAppSelector } from "@/src/store";
import { CharactersGrid } from "./CharactersGrid";
import { useEffect, useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { SimpleCharacter } from "../interfaces/simple-characters";

export const FavoriteCharacters = () => {

    const favoriteCharacters = useAppSelector(
        state => state.characters.favorites
    );

    const [characters, setCharacters] = useState<SimpleCharacter[]>([]);

    useEffect(() => {

        const favorites = Object.values(favoriteCharacters);

        setCharacters(currentCharacters => {

            // Agrega nuevos favoritos
            const newCharacters = favorites.filter(
                favorite =>
                    !currentCharacters.some(
                        character => character.id === favorite.id
                    )
            );

            return [...currentCharacters, ...newCharacters];
        });

    }, [favoriteCharacters]);

    return (
        <>
            {
                characters.length === 0
                    ? <NoFavorites />
                    : <CharactersGrid characters={characters} />
            }
        </>
    );
};

export const NoFavorites = () => {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center">
            <IoHeartOutline
                size={100}
                className="text-red-500"
            />

            <span>No hay Favoritos</span>
        </div>
    );
};