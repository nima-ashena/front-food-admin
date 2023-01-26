import { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getFoodsApi } from '../../api/admin.service';
import Food from '../../components/food/Food';
import Vocab from '../../components/food/Food';
import { IVocab } from '../../interface/restaurant.interface';

const Foods = () => {
   const [loading, setLoading] = useState(true);

   const [foods, setFoods] = useState<any[]>([]);
   const [render, setRender] = useState<boolean>(false);

   useEffect(() => {
      // const id = toast.loading('Loading...');
      getFoodsApi((isOk, result) => {
         if (isOk) {
            setFoods(result.foods);
            
            setLoading(false);
            // toast.dismiss(id)
         } else {
            console.log(result.message);
            // toast.update(id, {
            //    render: result.response.data.message,
            //    type: 'error',
            //    isLoading: false,
            //    autoClose: 2000,
            // });
         }
      });
   }, [render]);

   return (
      <>
         <div className="container py-4">

            {loading && (
               <Button className="w-100 py-3" variant="primary" disabled>
                  <Spinner
                     className="mx-2"
                     as="span"
                     animation="grow"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                  />
                  Loading...
               </Button>
            )}

            <div className="row align-items-center px-1 g-1">
               {foods.map(item => (
                  <Food
                     food={item}
                     render={render}
                     setRender={setRender}
                     key={item._id}
                  />
               ))}
            </div>
         </div>
      </>
   );
};

export default Foods;
