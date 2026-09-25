import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { toggleFavorite } from "../characters/characters";

export const localStorageMiddleware: Middleware = (state) => {
    return (next) => (action) => {

        next(action);

        if (toggleFavorite.match(action)) {

            const { characters } = state.getState() as RootState;

            localStorage.setItem(
                'favorite-characters',
                JSON.stringify(characters)
            );

            return;
        }
    };
};