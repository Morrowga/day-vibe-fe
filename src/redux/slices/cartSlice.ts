import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    image_urls: { url: string }[];
    price: number;
    cart_id: string; 
    quantity: number;
    category: Category;
    has_size: boolean,
    actual_price: number,
    size: string
    sizes: Size[]
}

interface Size {
    name: string;
    price: number;
}

interface Category {
    name_mm: string;
    has_size: boolean;
    sizes: Size[];
}


interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.cart_id === action.payload.cart_id);

            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                const newItem = { ...action.payload };            
                if (newItem.has_size && newItem.category.sizes?.length > 0) {
                    const initialSizePrice = newItem.category.sizes[0].price;
                    newItem.actual_price = Number(newItem.price) + Number(initialSizePrice);
                    newItem.size = newItem.category.sizes[0].name;
                    state.items.push(newItem);
                } else {
                    const existingItemIndex = state.items.find(item => item.id === newItem.id);

                    if(!existingItemIndex)
                    {
                        newItem.actual_price = Number(newItem.price);
                        newItem.size = '';
    
                        state.items.push(newItem);
                    }
                }
            }
            
            cartTotals(state);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const removedItem = state.items.find((item) => item.cart_id === action.payload);
            if (removedItem) {
              state.items = state.items.filter((item) => item.cart_id !== action.payload);

              cartTotals(state);
            }
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ cart_id: string; quantity: number }>
        ) => {
            const item = state.items.find((item) => item.cart_id === action.payload.cart_id);
            if (item) {
                item.quantity = Math.max(1, action.payload.quantity);
                cartTotals(state);
            }
        },
        updateItemSize: (state, action: PayloadAction<{ cart_id: string; size: string }>) => {
            const { cart_id, size } = action.payload;
            console.log(state.items);
            const item = state.items.find((item) => item.cart_id === cart_id);
            if (item && item.category && item.has_size && item.category.sizes) {
                item.size = size;
                
                const selectedSize = item.category.sizes.find(s => s.name === size);
                
                if (selectedSize) {
                    item.actual_price = Number(item.price) + Number(selectedSize.price)
                }
            }

            cartTotals(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
    },
});

const cartTotals = (state: CartState) => {
    let totalQuantity = 0;
    let totalAmount = 0;

    state.items.forEach((item) => {
        totalQuantity += item.quantity;
        totalAmount += item.quantity * item.actual_price;
    });

    state.totalQuantity = totalQuantity;
    state.totalAmount = totalAmount;
};

export const { addItem, removeItem, updateQuantity, clearCart,updateItemSize } = cartSlice.actions;
export default cartSlice.reducer;
