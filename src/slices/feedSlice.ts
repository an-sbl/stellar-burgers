import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

interface TInitState {
  feed: TOrder[];
  loading: boolean;
  total: number;
  totalToday: number;
  isModalOpened: boolean;
}

const initialState: TInitState = {
  feed: [],
  loading: false,
  total: 0,
  totalToday: 0,
  isModalOpened: false
};

export const fetchFeed = createAsyncThunk('orders/all', async () =>
  getFeedsApi()
);
const feedSlice = createSlice({
  name: 'feed',
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
    selectFeed: (state) => state.feed,
    selectLoading: (state) => state.loading,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday,
    selectIsModalOpened: (state) => state.isModalOpened
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.loading = false;
      state.feed = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});
export const { openModal, closeModal } = feedSlice.actions;

export const {
  selectLoading,
  selectFeed,
  selectTotal,
  selectTotalToday,
  selectIsModalOpened
} = feedSlice.selectors;
export default feedSlice.reducer;
