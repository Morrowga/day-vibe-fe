import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Define the types
interface Size {
    name: string;
    price: number;
}

interface Category {
    name_mm: string;
    has_size: boolean;
    sizes: Size[];
}

interface Product {
    name: string;
    price: number;
    image_urls: { url: string }[];
    first_image: string;
    stock: number;
    active: boolean;
    has_size: boolean,
    category: Category;
}

interface PaginatedData {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface ApiResponse {
    data: PaginatedData;
    message: string;
    success: boolean;
}

interface ProductError {
    message: string;
}

interface ProductState {
    data: ApiResponse | null;
    allProducts: Product[];
    currentPage: number;
    hasMore: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    loadingMore: boolean;
    error: string | null;
}

const initialState: ProductState = {
    data: null,
    allProducts: [],
    currentPage: 1,
    hasMore: true,
    status: 'idle',
    loadingMore: false,
    error: null,
};

// Define params interface for better type safety
interface FetchProductsParams {
    category?: string;
    q?: string;
    page?: number;
    isLoadingMore?: boolean;
}

// Fetch products
export const fetchProducts = createAsyncThunk<
    ApiResponse,
    FetchProductsParams,
    { rejectValue: ProductError }
>(
    'product/fetchProducts',
    async (params, { rejectWithValue }) => {
        try {
            // Destructure the params or use empty object if it's undefined
            const { category, q, page = 1 } = params || {};
            
            // Create params object for the API request
            const requestParams: Record<string, string | number> = { page };
            if (category) requestParams.category = category;
            if (q) requestParams.q = q;
            
            const response = await axiosInstance.get<ApiResponse>(
                '/store-products',
                { params: requestParams }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.message || 'Failed to fetch products' });
        }
    }
);

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.allProducts = [];
            state.currentPage = 1;
            state.hasMore = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                // Safe way to access properties that might not exist in TypeScript's view
                const isLoadingMore = action.meta?.arg?.isLoadingMore ?? false;
                
                if (isLoadingMore) {
                    state.loadingMore = true;
                } else {
                    state.status = 'loading';
                }
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                // Safe way to access properties that might not exist in TypeScript's view
                const isLoadingMore = action.meta?.arg?.isLoadingMore ?? false;
                const paginationData = action.payload.data;
                
                // Update state based on whether we're loading more or doing an initial load
                if (isLoadingMore) {
                    // Append new products to existing ones
                    state.allProducts = [...state.allProducts, ...paginationData.data];
                    state.loadingMore = false;
                } else {
                    // Replace products for initial or search load
                    state.allProducts = paginationData.data;
                    state.status = 'succeeded';
                }
                
                // Update pagination state
                state.data = action.payload;
                state.currentPage = paginationData.current_page;
                state.hasMore = paginationData.next_page_url !== null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                // Safe way to access properties that might not exist in TypeScript's view
                const isLoadingMore = action.meta?.arg?.isLoadingMore ?? false;
                
                if (isLoadingMore) {
                    state.loadingMore = false;
                } else {
                    state.status = 'failed';
                }
                
                state.error = action.payload?.message || 'Failed to fetch products';
            });
    },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;