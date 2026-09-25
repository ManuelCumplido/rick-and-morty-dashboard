import { SimpleCharacter } from '@/src/characters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CharactersState {
   favorites: { [key: string]: SimpleCharacter,}
}

//const getInitialState = (): CharactersState => {
//
//    //if (typeof window === 'undefined')return {};
//    const favorites = JSON.parse(localStorage.getItem('favorite-characters') ?? '{}');
//    return favorites;
//};

const initialState: CharactersState = {
    favorites: {},
}

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {

        setFavoriteCharacters( state, action: PayloadAction<{[key:string]: SimpleCharacter}>){
            state.favorites = action.payload;
        },

        toggleFavorite(state, action: PayloadAction<SimpleCharacter>) {
            const character = action.payload;
            const { id } = character;

            if (state.favorites[id]) {
                delete state.favorites[id];
                //return;
            } else{
                state.favorites[id] = character;
            }

            localStorage.setItem('favorite-characters', JSON.stringify(state.favorites))
            
        }

    }
});

export const { toggleFavorite, setFavoriteCharacters } = charactersSlice.actions

export default charactersSlice.reducer;
