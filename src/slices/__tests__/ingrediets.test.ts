import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice, { fetchIngredients } from '../ingredientsSlice';

function initStore() {
  return configureStore({
    reducer: {
      ingredients: ingredientsSlice
    }
  });
}

/*  При вызове экшенаRequest булевая переменная, отвечающая за текущий запрос (например, store.isLoading) меняется на true.
    При вызове экшена Success и передаче в него ингредиентов эти данные записываются в стор (например, в [store.data](http://store.data)) и store.isLoading меняется на false.
    При вызове экшена Failed и передаче в него ошибки она записывается в стор (например, store.error) и store.isLoading меняется на false.*/
describe('Тесты получения списка ингридиентов', () => {
  test('Тесты ожидания загрузки ингридиентов', () => {
    const store = initStore();
    const state = ingredientsSlice(
      store.getState().ingredients,
      fetchIngredients.pending('')
    );
    expect(state.loading).toBe(true);
  });

  test('Тесты успешной загрузки ингридиентов', () => {
    const mockResponse = [
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: '59e947f1-c67a-487f-a3a6-afa9f4cac3b1'
      }
    ];
    const store = initStore();
    const state = ingredientsSlice(
      store.getState().ingredients,
      fetchIngredients.fulfilled(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockResponse);
  });

  test('Тесты ошибки загрузки ингридиентов', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = ingredientsSlice(
      store.getState().ingredients,
      fetchIngredients.rejected(mockResponse, '')
    );
    expect(state.loading).toBe(false);
  });
});
//TODO тесты модального окна
