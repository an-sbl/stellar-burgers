import { expect, test, describe } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import burgerConstuctorSlice, {
  addIngredient,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp,
  updateConstructorItems
} from '../burgerConstruclorSlice';
import { mockConstructorItems, mockMainIngredient, mockBun } from '../mockData';

function initStore() {
  return configureStore({
    reducer: {
      burgerConstuctor: burgerConstuctorSlice
    },
    preloadedState: {
      burgerConstuctor: {
        constructorItems: mockConstructorItems
      }
    }
  });
}

/*    обработку экшена добавления ингредиента;
    обработку экшена удаления ингредиента;
    обработку экшена изменения порядка ингредиентов в начинке;*/
describe('Тесты экшенов burgerConstuctorSlice', () => {
  describe('Тесты добавления ингридиентов', () => {
    test('Тест добавления основного состава бургера', () => {
      const store = initStore();
      const state = store.getState().burgerConstuctor.constructorItems;
      expect(state.ingredients.length).toEqual(3);

      store.dispatch(addIngredient(mockMainIngredient));
      const newState = store.getState().burgerConstuctor.constructorItems;
      expect(newState.ingredients.length).toEqual(4);
    });
    test('Тест добавления булки бургера', () => {
      const store = initStore();
      const state = store.getState().burgerConstuctor.constructorItems;
      expect(state.ingredients.length).toEqual(3);
      expect(state.bun).toBe(null);
      store.dispatch(addIngredient(mockBun));
      const newState = store.getState().burgerConstuctor.constructorItems;
      expect(newState.ingredients.length).toEqual(3);
      expect(newState.bun?.name).toEqual('Краторная булка N-200i');
    });
    //TODO
    /*test('Тест замены булки бургера', () => {
      const store = initStore();
      const state = store.getState().burgerConstuctor.constructorItems;
      expect(state.ingredients.length).toEqual(3);

      store.dispatch(addIngredient(mockBun));
      const newState = store.getState().burgerConstuctor.constructorItems;
      expect(newState.ingredients.length).toEqual(3);
      expect(newState.bun?.name === 'Краторная булка N-200i');
    });*/
  });
  test('Тест добавления удаления состава бургера', () => {
    const store = initStore();
    const state = store.getState().burgerConstuctor.constructorItems;
    expect(state.ingredients.length).toEqual(3);

    store.dispatch(deleteIngredient(mockMainIngredient));
    const newState = store.getState().burgerConstuctor.constructorItems;
    expect(newState.ingredients.length).toEqual(2);
  });
  describe('Тесты изменения порядка ингредиентов в начинке', () => {
    test('Тест перемещения ингридиента вверх', () => {
      const store = initStore();
      const ingredients =
        store.getState().burgerConstuctor.constructorItems.ingredients;
      const lastIngredient = ingredients[ingredients.length - 1];
      store.dispatch(moveIngredientUp(lastIngredient));
      const newIngredients =
        store.getState().burgerConstuctor.constructorItems.ingredients;
      expect(newIngredients[ingredients.length - 2]).toEqual(lastIngredient);
    });
    test('Тест перемещения ингридиента вниз', () => {
      const store = initStore();
      const ingredients =
        store.getState().burgerConstuctor.constructorItems.ingredients;
      const fisrtIngredient = ingredients[0];
      store.dispatch(moveIngredientDown(fisrtIngredient));
      const newIngredients =
        store.getState().burgerConstuctor.constructorItems.ingredients;
      expect(newIngredients[1]).toEqual(fisrtIngredient);
    });
  });
  test('Тест обновления состояния конструктора бургера', () => {
    const store = initStore();
    const state = store.getState().burgerConstuctor.constructorItems;
    store.dispatch(addIngredient(mockBun));
    expect(state.ingredients.length).toEqual(3);
    store.dispatch(updateConstructorItems());
    const newState = store.getState().burgerConstuctor.constructorItems;
    expect(newState.ingredients.length).toEqual(0);
    expect(state.bun).toEqual(null);
  });
});
