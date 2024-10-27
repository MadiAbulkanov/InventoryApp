import { axiosApiClient } from '@/api/axiosApiClient';
import { Place } from '@/interfaces/place.interface';
import { Product } from '@/interfaces/product.interface';
import { ServerError } from '@/interfaces/serverError.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface State {
  items: Product[];
  selectedItem: Product | null;
  error: null | string;
  errors: { type: string; messages: string[] }[];
  isLoading: boolean;
}

const initialState: State = {
  items: [],
  selectedItem: null,
  error: null,
  errors: [],
  isLoading: false,
};

export const fetchProducts = createAsyncThunk<Product[]>('fetch/products', async () => {
  const { data } = await axiosApiClient.get<Product[]>('/items');
  return data;
});

export const fetchProductById = createAsyncThunk<Product, string>('fetch/productsById', async (id: string) => {
  const { data } = await axiosApiClient.get<Product>(`/items/${id}`);
  return data;
});

export const createProduct = createAsyncThunk<Product, FormData, { rejectValue: ServerError }>(
  'post/products',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.post<Product>('/items', payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while creating place'] }] });
    }
  }
);

export const editProduct = createAsyncThunk<Place, { id: string; formData: FormData }, { rejectValue: ServerError }>(
  'edit/product',
  async (payload, { rejectWithValue }) => {
    const { id, formData } = payload;
    try {
      const { data } = await axiosApiClient.put<Place>(`/items/${id}`, formData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while editing place'] }] });
    }
  }
);

export const deleteProduct = createAsyncThunk<void, string, { rejectValue: ServerError }>(
  'delete/product',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.delete(`/items/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while deleting place'] }] });
    }
  }
);

const productSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProductById';
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.errors = [];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.errors || [{ type: 'general', messages: ['Error creating category'] }];
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.errors || [{ type: 'general', messages: ['Error editing item'] }];
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.meta.arg);
        state.isLoading = false;
        state.error = null;
        state.errors = [];
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.errors || [{ type: 'general', messages: ['Error deleting item'] }];
      });
  },
});

export default productSlice;
