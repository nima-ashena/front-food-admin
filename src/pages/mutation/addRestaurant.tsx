import { stringify } from 'querystring';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { FileImage } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import { addRestaurantApi } from '../../api/admin.service';
import { IAddRestaurant } from '../../interface/restaurant.interface';
import './style.css';

const AddRestaurant = () => {
   const [name, setName] = useState<string>('');
   const [address, setAddress] = useState<string>('');
   const [categories, setCategories] = useState<string[]>([]);
   const [city, setCity] = useState<string>('');
   const [registrationNumber, setRegistrationNumber] = useState<string>('');

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
         address == '' ||
         categories.length == 0 ||
         city == '' ||
         registrationNumber == ''
      ) {
         toast.warn('Please fill all the felids');
         return;
      }

      const id = toast.loading('Adding Restaurant...');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('categories', categories.join(','));
      formData.append('city', city);
      formData.append('registrationNumber', registrationNumber);
      if (imageFile) {
         formData.append('image', imageFile, imageFile.name);
      }

      addRestaurantApi(formData, (isOk, result) => {
         if (isOk) {
            toast.update(id, {
               render: 'Restaurant added successfully',
               type: 'success',
               isLoading: false,
               autoClose: 2000,
            });
            setName('');
            setAddress('');
            // setCategories([]);
            setCity('');
            setRegistrationNumber('');
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
               <label className="form-label">City</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setCity(e.target.value);
                  }}
                  value={city}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">Address</label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setAddress(e.target.value);
                  }}
                  value={address}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">registrationNumber </label>
               <input
                  type="text"
                  className="form-control"
                  onChange={e => {
                     setRegistrationNumber(e.target.value);
                  }}
                  value={registrationNumber}
               />
            </div>
            <div className="mb-3">
               <label className="form-label">Categories</label>
               <div key={`reverse-checkbox`} className="mb-3">
                  <Form.Check
                     reverse
                     label="Irani"
                     name="Irani"
                     type="checkbox"
                     id={`reverse-checkbox-1`}
                     onChange={e => {
                        if (e.target.checked) {
                           categories.push(e.target.name)
                        } else {
                           categories.slice(categories.indexOf(e.target.name), 1)
                        }
                     }}
                  />
                  <Form.Check
                     reverse
                     label="FastFood"
                     name="FastFood"
                     type="checkbox"
                     id={`reverse-checkbox-2`}
                     onChange={e => {
                        if (e.target.checked) {
                           categories.push(e.target.name)
                        } else {
                           categories.slice(categories.indexOf(e.target.name), 1)
                        }
                     }}
                  />
                  <Form.Check
                     reverse
                     label="Seafood"
                     name="Seafood"
                     type="checkbox"
                     id={`reverse-checkbox-2`}
                     onChange={e => {
                        if (e.target.checked) {
                           categories.push(e.target.name)
                        } else {
                           categories.slice(categories.indexOf(e.target.name), 1)
                        }
                     }}
                  />
               </div>
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
               Add Restaurant
            </button>
         </form>
      </div>
   );
};

export default AddRestaurant;
