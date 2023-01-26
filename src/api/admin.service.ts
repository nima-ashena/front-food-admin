import axios from 'axios';

import { BASE_URL } from '.';
import { IAddRestaurant } from '../interface/restaurant.interface';

type ApiFunction = (isOk: boolean, resultData?: any) => void;

// Get Restaurant
export const getRestaurantApi = (callBack: ApiFunction) => {
   axios
      .get(`${BASE_URL}/restaurant/current`, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data.restaurant);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Get Foods
export const getFoodsApi = (callBack: ApiFunction, filters?: any[]) => {
   let url = `${BASE_URL}/food/current`;
   // if (filters?.length)
   //    for (let i = 0; i < filters?.length; i++) {
   //       if (i == 0) url += `?${filters[i].name}=${filters[i].value}`;
   //       else url += `&${filters[i].name}=${filters[i].value}`;
   //    }
   axios
      .get(url, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Get Foods
export const getAdminOrdersApi = (callBack: ApiFunction, filters?: any[]) => {
   let url = `${BASE_URL}/order/current`;
   // if (filters?.length)
   //    for (let i = 0; i < filters?.length; i++) {
   //       if (i == 0) url += `?${filters[i].name}=${filters[i].value}`;
   //       else url += `&${filters[i].name}=${filters[i].value}`;
   //    }
   axios
      .get(url, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Add Restaurant
export const addRestaurantApi = (data: any, callBack: ApiFunction) => {
   axios
      .post(`${BASE_URL}/restaurant`, data, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Add Food
export const addFoodApi = (data: any, callBack: ApiFunction) => {
   axios
      .post(`${BASE_URL}/food`, data, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Edit Restaurant
export const editRestaurantApi = (formData: any, callBack: ApiFunction) => {
   axios
      .patch(`${BASE_URL}/restaurant/current`, formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Edit Order
export const editOrderApi = (orderId: string ,formData: any, callBack: ApiFunction) => {
   axios
      .patch(`${BASE_URL}/order/state/${orderId}`, formData, {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
         },
      })
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Edit Vocab
export const editVocabApi = (
   vocabId: any,
   formData: any,
   callBack: ApiFunction,
) => {
   axios
      .put(`${BASE_URL}/vocabs/${vocabId}`, formData)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// Delete Food
export const deleteFoodApi = (FoodId: any, callBack: ApiFunction) => {
   axios
      .post(
         `${BASE_URL}/food/delete`,
         {
            idList: [FoodId],
         },
         {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('AuthToken')}`,
            },
         },
      )
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};

// plus true guess Vocab
export const plusTrueVocabApi = (vocabId: any, callBack: ApiFunction) => {
   axios
      .post(`${BASE_URL}/vocabs/plus-true-guess/${vocabId}`)
      .then(result => {
         callBack(true, result.data);
      })
      .catch(err => {
         callBack(false, err);
      });
};
