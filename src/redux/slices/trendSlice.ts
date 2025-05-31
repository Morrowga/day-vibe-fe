// src/redux/slices/trendSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import { Trend, TrendResponse, TrendError } from '@/utils/types'; // Make sure to define these types

interface TrendState {
    data: Trend[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TrendState = {
    data: null,
    status: 'idle',
    error: null,
};

// Fetch trend posts
export const fetchTrends = createAsyncThunk<TrendResponse, void, { rejectValue: TrendError }>(
    'trend/fetchTrends',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<TrendResponse>('/search/trends');
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.message || 'Failed to fetch trends' });
        }
    }
);

const trendSlice = createSlice({
    name: 'trend',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTrends.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchTrends.fulfilled, (state, action: PayloadAction<TrendResponse>) => {
                state.status = 'succeeded';
                state.data = action.payload.data; 
            })
            .addCase(fetchTrends.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch trends';
            });
    },
});

export default trendSlice.reducer;
