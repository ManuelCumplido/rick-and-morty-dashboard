'use client';

import { useEffect, useRef, useState } from 'react';
import { SimpleCharacter } from '..';
import { CharactersGrid } from './CharactersGrid';
import { getCharacters } from '../actions/get-characters';

interface Props {
    initialCharacters: SimpleCharacter[];
}

export const CharactersInfiniteScroll = ({ initialCharacters }: Props) => {

    const [characters, setCharacters] = useState(initialCharacters);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement>(null);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
        });
    }, []);

    useEffect(() => {


        const observer = new IntersectionObserver(
            (entries) => {

                const entry = entries[0];

                if (entry.isIntersecting && !isLoadingRef.current) {
                    isLoadingRef.current = true;
                    setPage((currentPage) => currentPage + 1);
                }

            },
            {
                rootMargin: '1500px 0px'
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {

        if (page === 1) return;

        const loadMoreCharacters = async () => {

            setIsLoading(true);

            const newCharacters = await getCharacters(page);

            setCharacters((currentCharacters) => {

                const existingIds = new Set(
                    currentCharacters.map(character => character.id)
                );

                const uniqueCharacters = newCharacters.filter(
                    character => !existingIds.has(character.id)
                );

                return [
                    ...currentCharacters,
                    ...uniqueCharacters
                ];
            });

            setIsLoading(false);
            isLoadingRef.current = false;
        };

        loadMoreCharacters();

    }, [page]);

    return (
        <>
            <CharactersGrid characters={characters} />

            <div
                ref={loadMoreRef}
                className="w-full flex justify-center py-10"
            >
                {isLoading && (
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-blue-600" />
                )}
            </div>
        </>
    );
};