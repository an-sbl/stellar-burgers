import {
  NotFound404,
  ConstructorPage,
  Feed,
  Profile,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import {
  AppHeader,
  Modal,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute
} from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '../../components/ui';
import {
  fetchIngredients,
  selectIngredients,
  selectLoading,
  selectIsModalOpened as selectModalIngridient,
  closeModal as closeModalIngridient
} from '../../slices/ingredientsSlice';
import {
  selectIsModalOpened as selectModalOrder,
  closeModal as closeModalOrder
} from '../../slices/feedSlice';
import { checkUserAuth } from '../../slices/userSlice';
const App = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectLoading);
  const isModalOpenedIngridient = useSelector(selectModalIngridient);
  const isModalOpenedOrder = useSelector(selectModalOrder);
  const location = useLocation();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <Routes location={backgroundLocation || location}>
            <Route path='*' element={<NotFound404 />} />
            <Route path='/' element={<ConstructorPage />} />
            <Route path='/ingredients/:id' element={<IngredientDetails />} />
            <Route path='/feed' element={<Feed />} />
            <Route path='/feed/:number' element={<OrderInfo />} />
            <Route path='/profile/orders/:number' element={<OrderInfo />} />
            <Route
              path='/login'
              element={<ProtectedRoute onlyUnAuth component={<Login />} />}
            />
            <Route
              path='/register'
              element={<ProtectedRoute onlyUnAuth component={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth component={<ForgotPassword />} />
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth component={<ResetPassword />} />
              }
            />
            <Route
              path='/profile'
              element={<ProtectedRoute component={<Profile />} />}
            />
            <Route
              path='/profile/orders/'
              element={<ProtectedRoute component={<ProfileOrders />} />}
            />
            <Route
              path='/profile/orders/:number'
              element={<ProtectedRoute component={<OrderInfo />} />}
            />
          </Routes>
          {(isModalOpenedIngridient || isModalOpenedOrder) &&
            backgroundLocation && (
              <Routes>
                <Route
                  path='/ingredients/:id'
                  element={
                    <Modal
                      title={'Описание ингредиента'}
                      onClose={() => {
                        dispatch(closeModalIngridient());
                      }}
                    >
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route
                  path='/feed/:number'
                  element={
                    <Modal
                      title={'Описание заказа'}
                      onClose={() => {
                        dispatch(closeModalOrder());
                      }}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
                <Route
                  path='/profile/orders/:number'
                  element={
                    <Modal
                      title={'Описание вашего заказа'}
                      onClose={() => {
                        dispatch(closeModalOrder());
                      }}
                    >
                      <OrderInfo />
                    </Modal>
                  }
                />
              </Routes>
            )}
        </>
      )}
    </div>
  );
};

export default App;
