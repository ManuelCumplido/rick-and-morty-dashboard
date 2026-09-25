import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counter/counterSlice'
import charactersReducer from './characters/characters'
import { useDispatch, useSelector } from 'react-redux'
import { localStorageMiddleware } from './middlewares/localstorage-middleware'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    characters: charactersReducer,
  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  //  .concat(localStorageMiddleware)
})
console.log("STORE STATE:", store.getState());

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();