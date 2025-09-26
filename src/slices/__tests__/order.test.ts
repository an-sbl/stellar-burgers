import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderSlice, { fetchOrder } from '../orderSlice';

function initStore() {
  return configureStore({
    reducer: {
      order: orderSlice
    }
  });
}

describe('Тесты отправки заказов', () => {
  test('Тесты ожидания отправки заказа', () => {
    const mockOrder = ['testid1', 'testid2', 'testid3'];
    const store = initStore();
    const state = orderSlice(
      store.getState().order,
      fetchOrder.pending('', mockOrder)
    );
    expect(state.orderRequest).toBe(true);
  });

  test('Тесты успешной отправки заказа', () => {
    const mockResponse = {
      order: {
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
      },
      name: 'Флюоресцентный люминесцентный бургер',
      success: true
    };
    const store = initStore();
    const state = orderSlice(
      store.getState().order,
      fetchOrder.fulfilled(mockResponse, '', [''])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockResponse.order);
  });

  test('Тесты ошибки отправки заказа', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = orderSlice(
      store.getState().order,
      fetchOrder.rejected(mockResponse, '', [''])
    );
    expect(state.orderRequest).toBe(false);
  });
});
//TODO тесты модального окна
