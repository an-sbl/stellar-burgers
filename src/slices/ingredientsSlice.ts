import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '../utils/types';

interface TInitState {
  ingredients: TIngredient[];
  loading: boolean;
  isModalOpened: boolean;
  errorText: string;
}

const initialState: TInitState = {
  ingredients: [],
  loading: false,
  isModalOpened: false,
  errorText: ''
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpened = true;
    },
    closeModal(state) {
      state.isModalOpened = false;
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectLoading: (state) => state.loading,
    selectIsModalOpened: (state) => state.isModalOpened,
    selectErrorText: (state) => state.errorText
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.loading = false;
      state.errorText = action.error.message!;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.ingredients = action.payload;
    });
  }
});
export const { openModal, closeModal } = ingredientsSlice.actions;

export const {
  selectLoading,
  selectIngredients,
  selectIsModalOpened,
  selectErrorText
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
