
import { SimpleCharacter } from "../interfaces/simple-characters";
import { CharacterCard } from "./CharacterCard";

interface Props {
    characters: SimpleCharacter[];
}

export const CharactersGrid = ({ characters }: Props) => {
    return (
        <div className="flex flex-wrap gap-10 items-center justify-center">

            {
                characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                    
                    
                ))
            }

        </div>
    )
}
