// redux/store.js
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import cartReducer from './cartSlice';
import {
  SET_LOADING,
  SPECIAL_CATEG_SUCCESS,
  SPECIAL_CATEG_FAIL,
} from '../actions/HomeActions'; 
import { SET_PRODUCTS } from '../actions/ShopActions';

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  isLoading: false,
  homeDetails: null,
  shopDetails: null,
  categories: null,
  products: null,
  error: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AUTH_STATE':
      localStorage.setItem('isAuthenticated', 'true');
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      localStorage.setItem('isAuthenticated', 'false');
      return { ...state, isAuthenticated: false };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case 'SET_HOME_DETAILS':
      return { ...state, homeDetails: action.payload };
    case 'SET_SHOP_DETAILS':
      return { ...state, shopDetails: action.payload };
    case SPECIAL_CATEG_SUCCESS:
      return { ...state, categories: action.payload, error: null };
    case SPECIAL_CATEG_FAIL:
      return { ...state, error: action.payload };
    case SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
