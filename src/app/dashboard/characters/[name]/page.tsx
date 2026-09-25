import { Character } from "@/src/characters";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
    params: Promise<{
        name: string;
    }>;
}

export async function generateStaticParams() {

    const res = await fetch(
        "https://rickandmortyapi.com/api/character"
    );

    const data = await res.json();

    return data.results.slice(0, 10).map((character: Character) => ({
        name: character.name
            .toLowerCase()
            .replaceAll(" ", "-")
    }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
    try {

        const { name } = await params;
        const character = await getCharacterByName(name);

        return {
            title: character.name,
            description: `Information about ${character.name}`
        };

    } catch (error) {
        console.error("Error generating metadata:", error);
        return {
            title: "Character Not Found",
            description: "No information available for this character."
        };
    }
}

const getCharacterByName = async (name: string): Promise<Character> => {

    const characterName = name.replaceAll("-", " ");
    
    const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}`,
        {
            //cache: "force-cache",
            next: {
                revalidate: 2592000, // 30 days in seconds
            },
        }
    );

    console.log("Character:", name, "Status:", res.status);

    if (!res.ok) {
        notFound();
    }

    const data = await res.json();

    return data.results[0];
};

export default function CharacterPage({ params }: Props) {
    return (
        <Suspense fallback={<div>Loading character...</div>}>
            <CharacterContent params={params} />
        </Suspense>
    );
}

async function CharacterContent({ params }: Props) {

    const { name } = await params;
    const character = await getCharacterByName(name);

    return (
        <div className="flex mt-5 flex-col items-center text-slate-800">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] mx-auto bg-white bg-clip-border  shadow-lg  p-3">
                <div className="mt-2 mb-8 w-full">
                    <h1 className="px-2 text-xl font-bold text-slate-700 capitalize">
                        #{character.id} {character.name}
                    </h1>
                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={character.image}
                            width={220}
                            height={220}
                            alt={`Imagen del personaje ${character.name}`}
                            className="mb-5"
                        />


                        <div className="flex flex-wrap gap-2 justify-center w-full px-2">
                            {character.episode.map((ep) => {
                                const episodeNumber = ep.split("/").pop();

                                return (
                                    <span
                                        key={ep}
                                        className="w-[82px] py-1 bg-slate-200 text-slate-700 rounded-full text-sm text-center whitespace-nowrap"
                                    >
                                        Episode {episodeNumber}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-2 w-full">

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
                        <p className="text-sm text-gray-600">Types</p>
                        <div className="text-base font-medium text-navy-700 flex">
                            <p className="mr-2 capitalize">
                                {character.species}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-start justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg ">
                        <p className="text-sm text-gray-600">Status</p>
                        <span className="text-base font-medium text-navy-700 flex">
                            {
                                character.status
                            }
                        </span>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
                        <p className="text-sm text-gray-600">Gender</p>
                        <p className="text-base font-medium">
                            {character.gender}
                        </p>
                    </div>

                    <div className="flex flex-col justify-center rounded-2xl bg-white bg-clip-border px-3 py-4  drop-shadow-lg">
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="text-base font-medium">
                            {character.location.name}
                        </p>
                    </div>



                </div>
            </div>
        </div>
    );
}