import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userSlice, {
  fetchRegisterUser,
  fetchLoginUser,
  fetchUpdateUser,
  fetchLogoutUser,
  fetchUserOrders
} from '../userSlice';

function initStore() {
  return configureStore({
    reducer: {
      user: userSlice
    }
  });
}

describe('Тесты получения списка заказов пользователя', () => {
  test('Тесты ожидания загрузки заказов пользователя', () => {
    const store = initStore();
    const state = userSlice(store.getState().user, fetchUserOrders.pending(''));
    expect(state.loading).toBe(true);
  });

  test('Тесты успешной загрузки заказов пользователя', () => {
    const mockResponse = [
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
    ];
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchUserOrders.fulfilled(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.userOrders).toBe(mockResponse);
  });
  test('Тесты ошибки загрузки заказов пользователя', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchUserOrders.rejected(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe(mockResponse.message);
  });
});

describe('Тесты регистрации пользователя', () => {
  const user = {
    name: 'user',
    email: 'test@mail.ru',
    password: 'test'
  };
  test('Тесты ожидания регистрации пользователя', () => {
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchRegisterUser.pending('', user, '')
    );
    expect(state.loading).toBe(true);
  });

  test('Тесты успешной регистрации пользователя', () => {
    const mockResponse = {
      success: true,
      refreshToken: 'testtoken',
      accessToken: 'testaccess',
      user: { name: 'user', email: 'test@mail.ru' }
    };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchRegisterUser.fulfilled(mockResponse, '', user)
    );
    expect(state.loading).toBe(false);
    expect(state.user).toBe(mockResponse.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.errorMessage).toEqual('');
  });
  test('Тесты ошибки регистрации пользователя', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchRegisterUser.rejected(mockResponse, '', user)
    );
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe(mockResponse.message);
    expect(state.isAuthenticated).toBe(false);
  });
});

describe('Тесты авторизации пользователя', () => {
  const user = {
    email: 'test@mail.ru',
    password: 'test'
  };
  test('Тесты ожидания авторизации пользователя', () => {
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchLoginUser.pending('', user, '')
    );
    expect(state.loading).toBe(true);
  });

  test('Тесты успешной авторизации пользователя', () => {
    const mockResponse = {
      success: true,
      refreshToken: 'testtoken',
      accessToken: 'testaccess',
      user: { name: 'user', email: 'test@mail.ru' }
    };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchLoginUser.fulfilled(mockResponse, '', user)
    );
    expect(state.loading).toBe(false);
    expect(state.user).toBe(mockResponse.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.errorMessage).toEqual('');
  });
  test('Тесты ошибки авторизации пользователя', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchLoginUser.rejected(mockResponse, '', user)
    );
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe(mockResponse.message);
    expect(state.isAuthenticated).toBe(false);
  });
});
describe('Тесты обновления данных пользователя', () => {
  const user = {
    email: 'test@mail.ru',
    password: 'test'
  };
  test('Тесты ожидания обновления данных пользователя', () => {
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchUpdateUser.pending('', user, '')
    );
    expect(state.loading).toBe(true);
  });

  test('Тесты успешного обновления данных пользователя', () => {
    const mockResponse = {
      success: true,
      refreshToken: 'testtoken',
      accessToken: 'testaccess',
      user: { name: 'user', email: 'test@mail.ru' }
    };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchUpdateUser.fulfilled(mockResponse, '', user)
    );
    expect(state.loading).toBe(false);
    expect(state.user).toBe(mockResponse.user);
  });
  test('Тесты ошибки обновления данных пользователя', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchUpdateUser.rejected(mockResponse, '', user)
    );
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe(mockResponse.message);
    expect(state.isAuthenticated).toBe(false);
  });
});
describe('Тесты выхода пользователя', () => {
  const user = {
    email: 'test@mail.ru',
    password: 'test'
  };
  test('Тесты ожидания выхода пользователя', () => {
    const store = initStore();
    const state = userSlice(store.getState().user, fetchLogoutUser.pending(''));
    expect(state.loading).toBe(true);
  });

  test('Тесты успешного выхода пользователя', () => {
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchLogoutUser.fulfilled(null, '')
    );
    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toEqual({ name: '', email: '' });
  });
  test('Тесты ошибки выхода пользователя', () => {
    const mockResponse = { name: 'test', message: 'error' };
    const store = initStore();
    const state = userSlice(
      store.getState().user,
      fetchLogoutUser.rejected(mockResponse, '')
    );
    expect(state.loading).toBe(false);
    expect(state.errorMessage).toBe(mockResponse.message);
  });
});
//TODO тесты модального окна
