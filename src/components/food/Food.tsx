import { FC, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_BACKEND_URL } from '../../api';
import { deleteFoodApi } from '../../api/admin.service';
// import { IVocab } from '../../interface/restaurant.interface';
import './style.css';

// const Vocab = ({ vocab }: { vocab: IVocab }, renderValue: boolean) => {
const Food = (props: any) => {
   // const vocab: IVocab = props.vocab;
   const food: any = props.food;
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

   const deleteFoodClick = () => {
      handleClose();
      deleteFoodApi(food._id, (isOk, result) => {
         const t = toast.loading('Deleting Vocab...');
         if (isOk) {
            setRender(!render);
            toast.update(t, {
               render: 'vocab deleted successfully',
               type: 'success',
               isLoading: false,
               autoClose: 2000,
            });
         } else {
            console.log(result.message);
            toast.update(t, {
               render: result.message,
               type: 'error',
               isLoading: false,
               autoClose: 2000,
            });
         }
      });
   };

   return (
      <>
         <div className="col-6 col-sm-6 col-md-4 col-lg-2 rounded-2">
            <div className="card cartt">
               <img
                  src={`${BASE_BACKEND_URL}/${food.image}`}
                  className="card-img-top"
                  alt="..."
               />
               <div className="card-body">
                  <h5 className="card-title">{food.name}</h5>
                  <p
                     className="card-text text-secondary"
                     style={{ fontSize: 15, height: 100, overflow: 'hidden' }}
                  >
                     {food.ingredients}
                  </p>
                  <p className="card-text" style={{ marginBottom: 0 }}>
                     {food.price} تومان
                  </p>
                  <div className="">
                     <div className="mb-3">
                        <span>
                           {food.rating}{' '}
                           <i
                              className="bi bi-star-fill"
                              style={{ color: 'yellow', fontSize: 25 }}
                           ></i>
                        </span>
                     </div>
                     <div className="d-flex g-1">
                        <div className="col">
                           <button
                              className="btn btn-primary w-100 mb-2"
                              style={{ borderRadius: '8px' }}
                           >
                              Edit
                           </button>
                        </div>
                        <div className="col">
                           <button
                              className="btn btn-danger w-100 mb-2"
                              style={{ borderRadius: '8px' }}
                              onClick={e => {
                                 setShow(true);
                              }}
                           >
                              Delete
                           </button>
                        </div>
                     </div>
                  </div>
                  {/* Modal */}
                  <Modal show={show} onHide={handleClose}>
                     <Modal.Header closeButton>
                        <Modal.Title>Delete Vocab: ?</Modal.Title>
                     </Modal.Header>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                           Close
                        </Button>
                        <Button variant="danger" onClick={deleteFoodClick}>
                           Yes
                        </Button>
                     </Modal.Footer>
                  </Modal>
               </div>
            </div>
         </div>
      </>
   );
};

export default Food;
