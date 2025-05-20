import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import feedStockService from "../services/feedStockService";
import { toast } from 'keep-react';

const initialState = {
    feedStocks: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// addFeedStock
export const addFeedStock = createAsyncThunk(
    "feedStock/addFeedStock",
    async (formData, thunkApi) => {
        try {
            console.log("formData", formData);
            const response = await feedStockService.addFeedStock(formData);
            toast.success(response.message);
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);

// getFeedStocks
export const getFeedStocks = createAsyncThunk(
    "feedStock/getFeedStocks",
    async (_, thunkApi) => {
        try {
            const response = await feedStockService.getFeedStocks();
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);

// getFeedStockSummary
export const getFeedStockSummary = createAsyncThunk(
    "feedStock/getFeedStockSummary",
    async (_, thunkApi) => {
        try {
            const response = await feedStockService.getFeedStockSummary();
            return response;
        } catch (error) {
            const message =
                error.response?.data?.message || error.message || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);


const feedStockSlice = createSlice({
    name: "feedStock",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        RESET(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFeedStock.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(addFeedStock.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addFeedStock.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            .addCase(getFeedStocks.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
            })
            .addCase(getFeedStocks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.feedStocks = action.payload;
            })
            .addCase(getFeedStocks.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFeedStockSummary.pending, (state) => {
                state.isLoading = true;
                state.isError = null;
            })
            .addCase(getFeedStockSummary.fulfilled, (state, action) => {
                state.isLoading = false;
                state.summary = action.payload;
            })
            .addCase(getFeedStockSummary.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.error.message;
            })
    }
});

export const { RESET } = feedStockSlice.actions;
export const selectIsSuccess = (state) => state.feedStock.isSuccess;
export const selectIsLoading = (state) => state.feedStock.isLoading;
export const selectIsError = (state) => state.feedStock.isError;
export default feedStockSlice.reducer;
