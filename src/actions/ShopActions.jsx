
import axios from "../axios";
import { API_URLS } from '../constants/config';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const ShopDetails = (data) => {
    console.log(data,"in actions");
  return async (dispatch) => {
    try {
      const response = await axios.post(API_URLS.SPECIAL_CATEGORIES, data);
      
      dispatch({ type: 'SET_PRODUCTS', payload: response.data.products }); 
    } catch (error) {
      console.error("Error fetching shop details", error);
      throw error;
    }
  };
};


export const ComboStore= async()=>{
    try {
        const response = await axios.get(API_URLS.SHOP_API);
        return response.data
    } catch (error) {
      console.error("Error fetching combostore details", error);
      throw error; 
    }
}

export const ProductDetails= async(id)=>{
  try {
     const response = await axios.get(`${API_URLS.PRODUCT_DETAILS}/${id}`);
     return response.data;
  } catch (error) {
    console.error("Error fetching product details", error);
    throw error;
  }
}