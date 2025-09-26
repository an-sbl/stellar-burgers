import { combineSlices, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from '../slices/ingredientsSlice';
import burgerConstuctorSlice from '../slices/burgerConstruclorSlice';
import orderSlice from '../slices/orderSlice';
import feedSlice from '../slices/feedSlice';
import userSlice from '../slices/userSlice';
import { initialState as ingredientsInitialState } from '../slices/ingredientsSlice';
import { initialState as burgerConstructorInitialState } from '../slices/burgerConstruclorSlice';
import { initialState as orderInitialState } from '../slices/orderSlice';
import { initialState as feedInitialState } from '../slices/feedSlice';
import { initialState as userInitialState } from '../slices/userSlice';

const rootReducer = combineSlices({
  ingredients: ingredientsSlice,
  burgerConstuctor: burgerConstuctorSlice,
  order: orderSlice,
  feed: feedSlice,
  user: userSlice
});

test('должен правильно комбинировать все слайсы', () => {
    // Тестируем редюсер напрямую, а не через store
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // Проверяем, что все части состояния присутствуют
    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstuctor');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('feed');
    expect(initialState).toHaveProperty('user');

    // Проверяем, что начальные состояния соответствуют ожидаемым
    expect(initialState.ingredients).toEqual(ingredientsInitialState);
    expect(initialState.burgerConstuctor).toEqual(burgerConstructorInitialState);
    expect(initialState.order).toEqual(orderInitialState);
    expect(initialState.feed).toEqual(feedInitialState);
    expect(initialState.user).toEqual(userInitialState);
  });
