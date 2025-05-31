// src/redux/slices/checkoutSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  name: string;
  phone_no: string;
  address: string;
  state_id: any;
  city_id: any;
  total_amount: number;
  image: string;
  total_quantity: number;
  items: any[];
}

const initialState: CheckoutState = {
  name: '',
  phone_no: '',
  address: '',
  state_id: null,
  city_id: null,
  image: '',
  total_amount: 0,
  total_quantity: 0,
  items: [],
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhoneNo: (state, action: PayloadAction<string>) => {
      state.phone_no = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setStateId: (state, action: PayloadAction<any>) => {
      state.state_id = action.payload;
    },
    setCityId: (state, action: PayloadAction<any>) => {
      state.city_id = action.payload;
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.total_amount = action.payload;
    },
    setTotalQuantity: (state, action: PayloadAction<number>) => {
      state.total_quantity = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
        state.image = action.payload;
    },
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    clearCheckoutData: (state) => {
      return initialState;
    },
  },
});

export const {
  setName,
  setPhoneNo,
  setAddress,
  setStateId,
  setCityId,
  setTotalAmount,
  setTotalQuantity,
  setImage,
  setItems,
  clearCheckoutData,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
