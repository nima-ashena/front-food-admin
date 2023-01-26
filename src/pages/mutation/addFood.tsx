import { stringify } from 'querystring';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FileImage } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import { addFoodApi, addRestaurantApi } from '../../api/admin.service';
import { IAddRestaurant } from '../../interface/restaurant.interface';
import './style.css';

const AddFood = () => {
   const [name, setName] = useState<string>('');
   const [ingredients , setIngredients ] = useState<string>('');
   const [category, setCategory] = useState<string>('ایرانی');
   const [price, setPrice] = useState<string>('');
   const [discountPercentage , setDiscountPercentage ] = useState<string>('');

   const [imageFile, setImageFile] = useState<File>();

   const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      const fileList = e.target.files;

      if (!fileList) return;

      setImageFile(fileList[0]);
   };

   const addRestaurantClick = async (
      event: React.FormEvent<HTMLFormElement>,
   ) => {
      event.preventDefault();
      if (
         name == '' ||
         ingredients == '' ||
         category == '' ||
         price == '' ||
         discountPercentage == ''
      ) {
         toast.warn('Please fill all the felids');
         return;
      }

      const id = toast.loading('Adding Food...');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('ingredients', ingredients );
      formData.append('category', category);
      formData.append('price', price);
      formData.append('discountPercentage', discountPercentage);
      if (imageFile) {
         formData.append('image', imageFile, imageFile.name);
      }

      addFoodApi(formData, (isOk, result) => {
         if (isOk) {
            toast.update(id, {
               render: 'ّFood added successfully',
               type: 'success',
               isLoading: false,
               autoClose: 2000,
            });
            setName('');
            setIngredients('');
            setCategory('');
            setPrice('');
            setDiscountPercentage('');
         } else {
            console.log(result.message);
            toast.update(id, {
               render: result.response.data.message,
               type: 'error',
               isLoading: false,
               autoClose: 2000,
            });
         }
      });
   };

   return (
      <div className="container">
         <form
            className="pt-3 col-sm-8 col-md-6 col-lg-4"
            onSubmit={event => {
               addRestaurantClick(event);
            }}
         >
            <div className="mb-3">
               <label className="form-label">Name</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setName(e.target.value);
                  }}
                  value={name}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">ingredients</label>
               <textarea
                  className="form-control"
                  rows={4}
                  onChange={e => {
                     setIngredients(e.target.value);
                  }}
                  value={ingredients}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">Category</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setCategory(e.target.value);
                  }}
                  value={category}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">discountPercentage</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setDiscountPercentage(e.target.value);
                  }}
                  value={discountPercentage}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">price</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setPrice(e.target.value);
                  }}
                  value={price}
               />
            </div>

            <div className="mb-3">
               <label className="form-label">Upload Image</label>
               <input
                  type="file"
                  className="mx-2"
                  onChange={handleFileChange}
               />
            </div>
            <button
               type="submit"
               className="btn btn-primary btn-lg w-100 add-btn mb-3"
            >
               Add Food
            </button>
         </form>
      </div>
   );
};

export default AddFood;
