import { combineSlices, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredientsSlice';
import burgerConstuctorSlice from '../slices/burgerConstruclorSlice';
import orderSlice from '../slices/orderSlice';
import feedSlice from '../slices/feedSlice';
import userSlice from '../slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstuctor: burgerConstuctorSlice,
  order: orderSlice,
  feed: feedSlice,
  user: userSlice
});
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
