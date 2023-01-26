import { FC, useState } from 'react';
import { Modal, Button, Form, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_BACKEND_URL } from '../../api';
import { deleteFoodApi, editOrderApi } from '../../api/admin.service';
// import { IVocab } from '../../interface/restaurant.interface';

// const Vocab = ({ vocab }: { vocab: IVocab }, renderValue: boolean) => {
const Order = (props: any) => {
   // const vocab: IVocab = props.vocab;
   const [state, setState] = useState('preparing');
   const order: any = props.order;
   const render: boolean = props.render;
   const setRender: React.Dispatch<React.SetStateAction<boolean>> =
      props.setRender;

   const [show, setShow] = useState(false);
   const handleClose = () => {
      setShow(false);
   };
   const handleShow = () => {
      setShow(true);
   };

   const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      editOrderApi(order._id, { newState: e.target.value }, (isOk, result) => {
         if (isOk) {
         } else {
            toast.warn(result.response.data.message);
         }
      });
   };

   return (
      <div className="col-12 col-sm-6 col-md-4 col-lg-2 rounded-2">
         <div className="card">
            <Card.Body>
               <Card.Title>تومان {order.totalSum} </Card.Title>
               <Card.Text style={{height: 120}}>
                  {order.foods.map((item: any) => {
                     return (
                        <>
                           <p>{`${item.count} ${item.food.name}`}</p>
                        </>
                     );
                  })}
               </Card.Text>
               <Card.Text style={{height: 80}}>{order.address}</Card.Text>
               <Form.Select
                  aria-label="Default select example"
                  value={state}
                  onChange={e => {
                     setState(e.target.value);
                     selectChange(e);
                  }}
               >
                  <option value="preparing">preparing</option>
                  <option value="delivering">delivering</option>
                  <option value="delivered">delivered</option>
                  <option value="canceled">canceled</option>
               </Form.Select>
            </Card.Body>
         </div>
      </div>
   );
};

export default Order;
