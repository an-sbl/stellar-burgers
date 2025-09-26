import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { fetchUserOrders, selectUserOrders } from '../../slices/userSlice';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, []);

  const orders = useSelector(selectUserOrders);

  if (!orders) {
    return <Preloader />;
  }
  return <ProfileOrdersUI orders={orders} />;
};
