import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAdminApi } from './api/auth.service';
import Login from './pages/auth/Login';
import Home from './pages/Home';
import AddRestaurantAdmin from './pages/mutation/addRestaurant';
import MyRestaurant from './pages/restaurant/MyRestaurant';
import AddFood from './pages/mutation/addFood';
import Foods from './pages/foods/Foods';
import Orders from './pages/orders/Orders';

const RoutesHandle = () => {
   useEffect(() => {}, []);

   return (
      <>
         <PublicRoute>
            <Routes>
               <Route path="/login" element={<Login />} />
            </Routes>
         </PublicRoute>
         <PrivateRoute>
            <Routes>
               <Route path="/admin/home" element={<Home />} />
               <Route path="/admin/foods" element={<Foods />} />
               <Route path="/admin/orders" element={<Orders />} />
               <Route
                  path="/admin/add-restaurant"
                  element={<AddRestaurantAdmin />}
               />
               <Route
                  path="/admin/my-restaurant"
                  element={<MyRestaurant />}
               />
               <Route
                  path="/admin/add-food"
                  element={<AddFood />}
               />
            </Routes>
         </PrivateRoute>
      </>
   );
};

const PrivateRoute = (props: any) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem('AuthToken')) {
         navigate('/login');
      } else {
         getAdminApi((isOk: boolean) => {
            if (isOk) {
               // navigate('/admin/home');
               // navigate('/admin/my-restaurant');
            } else {
               navigate('/login');
            }
         });
      }
   }, []);

   return <>{props.children}</>;
};
const PublicRoute = (props: any) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (!localStorage.getItem('AuthToken')) {
         navigate('/login');
      } else {
         getAdminApi((isOk: boolean) => {
            if (isOk) {
               // navigate('/admin/home');
               // navigate('/admin/my-restaurant');
            } else {
               navigate('/login');
            }
         });
      }
   }, []);

   return <>{props.children}</>;
};

export default RoutesHandle;
