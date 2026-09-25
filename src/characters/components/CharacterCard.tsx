'use client'
import Link from "next/link";
import { SimpleCharacter } from "../interfaces/simple-characters";
import Image from "next/image";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/src/store";
import { toggleFavorite } from "@/src/store/characters/characters";

interface Props {
    character: SimpleCharacter;
}


export const CharacterCard = ({ character }: Props) => {

    const { id, name } = character;
    const isFavorite = useAppSelector(state => !!state.characters.favorites[id])
    const dispatch = useAppDispatch();

    const onToggle = () => {
        dispatch( toggleFavorite(character) )
    }

    return (
        <div className="mx-auto right-0 mt-2 w-60">
            <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">

                    <Image
                        key={character.id}
                        src={character.image}
                        width={200}
                        height={200}
                        alt={character.name}
                        priority={false}
                    />


                    <p className="pt-2 text-lg font-semibold text-gray-50 capitalize h-14 flex items-center justify-center">
                        {name}
                    </p>
                    <div className="mt-5">
                        <Link
                            href={`/dashboard/characters/${name.toLowerCase().replaceAll(" ", "-")}`}
                            className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
                        >
                            Más información
                        </Link>
                    </div>
                </div>
                <div className="border-b">
                    <div onClick={ onToggle }
                        className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer" >

                        <div className="text-red-600">
                            {
                                isFavorite
                                    ? <IoHeart />
                                    : <IoHeartOutline />
                            }
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-800 leading-none">
                                {
                                    isFavorite
                                        ? 'Es Favorito'
                                        : 'No es Favorito'
                                }
                            </p>
                            <p className="text-xs text-gray-500">Click para Cambiar</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
