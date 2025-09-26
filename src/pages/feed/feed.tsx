import { Preloader } from '@ui';
import { setCookie, getCookie } from '../../utils/cookie';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectFeed, selectLoading, fetchFeed } from '../../slices/feedSlice';
export const Feed: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const orders = useSelector(selectFeed);
  const isLoading = useSelector(selectLoading);
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={orders}
          handleGetFeeds={() => {
            dispatch(fetchFeed());
          }}
        />
      )}
    </>
  );
};
