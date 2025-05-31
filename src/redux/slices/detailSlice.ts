// src/redux/slices/detailSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';
import { Content, DetailResponse, DetailError } from '@/utils/types';

interface DetailState {
    data: Content | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: DetailState = {
    data: null,
    status: 'idle',
    error: null,
};

// Fetch detail
export const fetchDetail = createAsyncThunk<DetailResponse, string, { rejectValue: DetailError }>(
    'detail/fetchDetail',
    async (display_url, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get<DetailResponse>(`/content/detail/${display_url}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue({ message: error.message || 'Failed to fetch detail' });
        }
    }
);

const detailSlice = createSlice({
    name: 'detail',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDetail.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchDetail.fulfilled, (state, action: PayloadAction<DetailResponse>) => {
                state.status = 'succeeded';
                state.data = action.payload.data; // This should now match Content
            })
            .addCase(fetchDetail.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload?.message || 'Failed to fetch detail';
            });
    },
});

export default detailSlice.reducer;
