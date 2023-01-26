import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { BASE_BACKEND_URL } from '../../api';
import { editRestaurantApi, getRestaurantApi } from '../../api/admin.service';
import { IRestaurant } from '../../interface/restaurant.interface';

const MyRestaurant = () => {
   const [isVerified, setIsVerified] = useState(false);
   const [name, setName] = useState<string>('');
   const [address, setAddress] = useState<string>('');
   const [categories, setCategories] = useState<string[]>([]);
   const [city, setCity] = useState<string>('');
   const [registrationNumber, setRegistrationNumber] = useState<string>('');
   const [imageUrl, setImageUrl] = useState('')

   const [irani, setIrani] = useState(false);
   const [fastFood, setFastFood] = useState(false);
   const [seaFood, setSeaFood] = useState(false);

   const [imageFile, setImageFile] = useState<File>();

   useEffect(() => {
      getRestaurantApi((isOk, result: any) => {
         if (isOk) {
            setIsVerified(result.isVerified);
            setName(result.name);
            setAddress(result.address);
            setCategories(result.categories);
            if (result.categories.includes('Irani')) setIrani(true);
            if (result.categories.includes('FastFood')) setFastFood(true);
            if (result.categories.includes('Seafood')) setSeaFood(true);
            setCity(result.city);
            setRegistrationNumber(result.registrationNumber);
            setImageUrl(result.image)
         } else {
            console.log(result);
         }
      });
      

   }, []);

   const handleFileChange = function (e: React.ChangeEvent<HTMLInputElement>) {
      const fileList = e.target.files;

      if (!fileList) return;

      setImageFile(fileList[0]);
   };

   const editRestaurantClick = async (
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

      const id = toast.loading('Editing Restaurant...');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('categories', categories.join(','));
      formData.append('city', city);
      formData.append('registrationNumber', registrationNumber);
      if (imageFile) {
         formData.append('image', imageFile, imageFile.name);
      }

      editRestaurantApi(formData, (isOk, result) => {
         if (isOk) {
            toast.update(id, {
               render: 'Restaurant edited successfully',
               type: 'success',
               isLoading: false,
               autoClose: 2000,
            });
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
               editRestaurantClick(event);
            }}
         >
            <div className="mb-3">
               {isVerified ? (
                  <div className="alert alert-success" role="alert">
                     Your restaurant is verified
                  </div>
               ) : (
                  <div className="alert alert-warning" role="alert">
                     Your restaurant isn't verified yet
                  </div>
               )}
            </div>
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
                     checked={irani}
                     onChange={e => {
                        setIrani(!irani);
                        if (e.target.checked) {
                           categories.push(e.target.name);
                        } else {
                           categories.slice(
                              categories.indexOf(e.target.name),
                              1,
                           );
                        }
                     }}
                  />
                  <Form.Check
                     reverse
                     label="FastFood"
                     name="FastFood"
                     type="checkbox"
                     id={`reverse-checkbox-2`}
                     checked={fastFood}
                     onChange={e => {
                        setFastFood(!fastFood)
                        if (e.target.checked) {
                           categories.push(e.target.name);
                        } else {
                           categories.slice(
                              categories.indexOf(e.target.name),
                              1,
                           );
                        }
                     }}
                  />
                  <Form.Check
                     reverse
                     label="Seafood"
                     name="Seafood"
                     type="checkbox"
                     id={`reverse-checkbox-2`}
                     checked={seaFood}
                     onChange={e => {
                        setSeaFood(!seaFood)
                        if (e.target.checked) {
                           categories.push(e.target.name);
                        } else {
                           categories.slice(
                              categories.indexOf(e.target.name),
                              1,
                           );
                        }
                     }}
                  />
               </div>
            </div>
            <div className='mb-3'>
               <label className="form-label">image</label>
               <img className='form-control' src={`${BASE_BACKEND_URL}/${imageUrl}`} alt={name} />
            </div>
            <div className="mb-3">
               <label className="form-label">Upload Image</label>
               <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
               />
            </div>
            <button
               type="submit"
               className="btn btn-primary btn-lg w-100 add-btn mb-3"
            >
               Edit Restaurant
            </button>
         </form>
      </div>
   );
};

export default MyRestaurant;
