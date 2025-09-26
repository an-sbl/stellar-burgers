import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import feedSlice, { fetchFeed } from '../feedSlice';
function initStore() {
  return configureStore({
    reducer: {
      feed: feedSlice
    }
  });
}

describe('Тесты получения списка заказов', () => {
  test('Тесты ожидания загрузки заказов', () => {
    const store = initStore();
    const state = feedSlice(store.getState().feed, fetchFeed.pending(''));
    expect(state.loading).toBe(true);
  });

  test('Тесты успешной загрузки заказов', () => {
    const mockResponse = {
      success: true,
      total: 1,
      totalToday: 1,
      orders: [
        {
          _id: '68d6846a673086001ba8a134',
          status: 'done',
          name: 'Экзо-плантаго флюоресцентный люминесцентный био-марсианский бургер',
          createdAt: '2025-09-26T12:17:46.151Z',
          updatedAt: '2025-09-26T12:17:47.212Z',
          number: 89727,
          ingredients: [
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0949',
            '643d69a5c3f7b9001cfa093d'
          ]
        }
      ]
    };
    const store = initStore();
    const state = feedSlice(
      store.getState().feed,
      fetchFeed.fulfilled(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.feed).toEqual(mockResponse.orders);
    expect(state.total).toEqual(mockResponse.total);
    expect(state.totalToday).toEqual(mockResponse.totalToday);
  });

  test('Тесты ошибки загрузки заказов', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = feedSlice(
      store.getState().feed,
      fetchFeed.rejected(mockResponse, '')
    );
    expect(state.loading).toBe(false);
  });
});
//TODO тесты модального окна
