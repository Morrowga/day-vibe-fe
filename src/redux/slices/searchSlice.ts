// src/redux/slices/searchSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import { Brand, Content, FilterInitialValue, BrandsResponse, ContentsResponse, SearchError } from '@/utils/types';

// Define the initial state
interface SearchState {
    brands: Brand[];
    contents: Content[];
    brandStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    contentStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    brandError: string | null;
    contentError: string | null;
    filterInitialValue: FilterInitialValue;
    brandPagination: {
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    };
    contentPagination: {
        current_page: number;
        total: number;
        per_page: number;
        last_page: number;
    };
}

const initialState: SearchState = {
    brands: [],
    contents: [],
    brandStatus: 'idle',
    contentStatus: 'idle',
    brandError: null,
    contentError: null,
    filterInitialValue: { q: '', take: 10 },
    brandPagination: {
        current_page: 1,
        total: 0,
        per_page: 6,
        last_page: 1,
    },
    contentPagination: {
        current_page: 1,
        total: 0,
        per_page: 6,
        last_page: 1,
    },
};

// Fetch brands
export const fetchBrands = createAsyncThunk<BrandsResponse, FilterInitialValue, { rejectValue: SearchError }>(
    'search/fetchBrands',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<BrandsResponse>('/search/brands', { params: filters });
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.message || 'Failed to fetch brands' });
        }
    }
);

// Fetch contents
export const fetchContents = createAsyncThunk<ContentsResponse, FilterInitialValue, { rejectValue: SearchError }>(
    'search/fetchContents',
    async (filters, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<ContentsResponse>('/search/contents', { params: filters });
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.message || 'Failed to fetch contents' });
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setFilterInitialValue(state, action: PayloadAction<FilterInitialValue>) {
            state.filterInitialValue = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBrands.pending, state => {
                state.brandStatus = 'loading';
            })
            .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<BrandsResponse>) => {
                state.brandStatus = 'succeeded';
                state.brands = action.payload.data.data; // Ensure correct path
                state.brandPagination = {
                    current_page: action.payload.data.current_page,
                    total: action.payload.data.total,
                    per_page: action.payload.data.per_page,
                    last_page: action.payload.data.last_page,
                };
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.brandStatus = 'failed';
                state.brandError = action.payload?.message || 'Failed to fetch brands';
            })
            .addCase(fetchContents.pending, state => {
                state.contentStatus = 'loading';
            })
            .addCase(fetchContents.fulfilled, (state, action: PayloadAction<ContentsResponse>) => {
                state.contentStatus = 'succeeded';
                state.contents = action.payload.data.data; // Ensure correct path
                state.contentPagination = {
                    current_page: action.payload.data.current_page,
                    total: action.payload.data.total,
                    per_page: action.payload.data.per_page,
                    last_page: action.payload.data.last_page,
                };
            })
            .addCase(fetchContents.rejected, (state, action) => {
                state.contentStatus = 'failed';
                state.contentError = action.payload?.message || 'Failed to fetch contents';
            });
    },
});

export const { setFilterInitialValue } = searchSlice.actions;
export default searchSlice.reducer;
