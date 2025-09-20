import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TConstructorItems,
  TConstructorIngredient
} from '../utils/types';

interface TInitState {
  constructorItems: TConstructorItems;
}

const initialState: TInitState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstuctorSlice = createSlice({
  name: 'burgerConstuctor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    deleteIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, index) => index !== ingredientIndex
        );
    },
    moveIngredientUp(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      const prevItem = state.constructorItems.ingredients[ingredientIndex - 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex - 1,
        2,
        action.payload,
        prevItem
      );
    },
    moveIngredientDown(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredientIndex = state.constructorItems.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      const nextItem = state.constructorItems.ingredients[ingredientIndex + 1];
      state.constructorItems.ingredients.splice(
        ingredientIndex,
        2,
        nextItem,
        action.payload
      );
    },
    updateConstructorItems(state) {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems
  }
});

export const { selectConstructorItems } = burgerConstuctorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  moveIngredientUp,
  moveIngredientDown,
  updateConstructorItems
} = burgerConstuctorSlice.actions;
export default burgerConstuctorSlice.reducer;
