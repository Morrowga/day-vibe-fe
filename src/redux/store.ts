import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import detailReducer from './slices/detailSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
