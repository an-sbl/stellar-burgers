import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructorItems,
  updateConstructorItems
} from '../../slices/burgerConstruclorSlice';
import {
  selectOrderModalData,
  selectOrderRequest,
  fetchOrder,
  updateOrderRequest
} from '../../slices/orderSlice';
import { selectIsAuthenticated } from '../../slices/userSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = useSelector(selectOrderRequest);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const orderModalData = useSelector(selectOrderModalData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    const ingredientsIds = constructorItems.ingredients.map((item) => item._id);
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      if (constructorItems.bun && constructorItems.ingredients.length) {
        dispatch(
          fetchOrder([
            constructorItems.bun._id,
            ...ingredientsIds,
            constructorItems.bun._id
          ])
        );
      }
    }
  };
  const closeOrderModal = () => {
    dispatch(updateConstructorItems());
    dispatch(updateOrderRequest());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
