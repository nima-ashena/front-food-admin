import { useState, useEffect } from 'react';
import { getAdminOrdersApi } from '../../api/admin.service';
import Order from '../../components/order/Order';

const Orders = () => {
   const [orders, setOrders] = useState<any[]>([]);
   const [render, setRender] = useState<boolean>(false);
   useEffect(() => {
      getAdminOrdersApi((isOk, result) => {
         if (isOk) {
            setOrders(result.orders);
         }
      });
   }, []);
   return (
      <>
         <div className="container py-3">
            <div className="row align-items-center px-1 g-1">
               {orders.map(item => {
                  return (
                     <Order
                        order={item}
                        render={render}
                        setRender={setRender}
                        key={item._id}
                     />
                  )
               })}
            </div>
         </div>
      </>
   );
};

export default Orders;
