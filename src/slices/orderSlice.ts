import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../utils/burger-api';
import { TOrder } from '../utils/types';

interface TInitState {
  orderModalData: TOrder | null;
  orderRequest: boolean;
}

const initialState: TInitState = {
  orderModalData: null,
  orderRequest: false
};
export const fetchOrder = createAsyncThunk(
  'orders/newOrder',
  async (data: string[]) => orderBurgerApi(data)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateOrderRequest(state) {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
      });
  },
  selectors: {
    selectOrderModalData: (state) => state.orderModalData,
    selectOrderRequest: (state) => state.orderRequest
  }
});

export const { selectOrderModalData, selectOrderRequest } =
  orderSlice.selectors;
export const { updateOrderRequest } = orderSlice.actions;
export default orderSlice.reducer;
