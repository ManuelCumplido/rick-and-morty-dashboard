'use client';

import { Provider } from "react-redux";
import { store } from "."
import { useEffect } from "react";
import {setFavoriteCharacters} from "./characters/characters"

interface Props {
    children: React.ReactNode
}


export const Providers = ({children}: Props) => {

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorite-characters') ?? '{}');
    store.dispatch(setFavoriteCharacters(favorites))
    
  }, [])


  return (
    <Provider store={ store }>
      {children}
    </Provider>
  )
}

