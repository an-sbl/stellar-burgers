describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:5173', function() {
        cy.visit('http://localhost:4000'); 
    });
}); 
const API_URL = Cypress.env('BURGER_API_URL');
beforeEach(() => {
  // ingredients
  cy.fixture('ingredients.json').then((ingredients) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/ingredients`
      },
      ingredients
    ).as('getIngredients');
  });
  // user
  cy.fixture('user.json').then((user) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/auth/user`
      },
      user
    ).as('getUser');
  });

  window.localStorage.setItem('refreshToken', 'testRefreshToken');
  cy.setCookie('accessToken', 'testAccessToken');

  cy.visit('/');
  cy.wait('@getIngredients');
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});
describe('Тест конструктора', () => {
  const bunSelector = `[data-cy=bun_643d69a5c3f7b9001cfa093c]`;
  const ingredientSelector = `[data-cy=ingredient_643d69a5c3f7b9001cfa0941]`;
  describe('Тесты модальных окон', () => {
    it('Открытие и закрытие по кнопке модального окна', () => {
        const ingredient = cy.get(bunSelector);
        ingredient.click();
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=ingredient_name]').contains('Краторная булка N-200i');
        cy.get(`[data-cy=close_modal_btn]`).click();
        cy.get('[data-cy=modal]').should('not.exist');
    });
    
    /* TODO
     it('Открытие и закрытие по оверлею модального окна', () => {
        const ingredient = cy.get(bunSelector);
        ingredient.click();
     
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal_overlay]').should('be.visible');
    
     cy.get('[data-cy=modal_overlay]').trigger('click');
    
    cy.get('[data-cy=modal]').should('not.exist');
    });*/
  });

  it('Тест добавления булки и ингридиента', () => {
    cy.get(bunSelector + ` button`).as('addBun');
    cy.get(ingredientSelector + ` button`).as('addIngredient');

    cy.get('[data-cy=no_bun_1]').contains('Выберите булки');
    cy.get('[data-cy=no_bun_2]').contains('Выберите булки');
    cy.get('[data-cy=no_ingredients]').contains('Выберите начинку');

    cy.get('@addBun').click();
    cy.get('@addIngredient').click({ multiple: true });

    cy.get(`[data-cy=burgerConstructor_section]`).contains('булка');
    cy.get(`[data-cy=burgerIngredient_element]`);
  });
  it('Тест оформления заказа', () => {
    cy.fixture('order.json').then((order) => {
    cy.intercept(
      {
        method: 'POST',
        url: `${API_URL}/orders`
      },
      order
    ).as('orderRequest');
  });
      cy.get(bunSelector + ` button`).as('addBun');
      cy.get(ingredientSelector + ` button`).as('addIngredient');
      cy.get('@addBun').click();
      cy.get('@addIngredient').click({ multiple: true });
      //Вызывается клик по кнопке «Оформить заказ».
      cy.get('[data-cy=order_btn]').click();
      cy.wait('@orderRequest').then((interception) => {
        expect(interception.response?.statusCode).to.eq(200);
      });
      //Проверяется, что модальное окно открылось и номер заказа верный.
      cy.fixture('order.json').then((order) => {
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get(`[data-cy=order_number]`).contains(order.order.number);
      });
      //Закрывается модальное окно и проверяется успешность закрытия.
      cy.get(`[data-cy=close_modal_btn]`).click();
      cy.get('[data-cy=modal]').should('not.exist');

      // Проверяется, что конструктор пуст
      cy.get('[data-cy=no_bun_1]').contains('Выберите булки');
      cy.get('[data-cy=no_bun_2]').contains('Выберите булки');
      cy.get('[data-cy=no_ingredients]').contains('Выберите начинку');
  });
});
