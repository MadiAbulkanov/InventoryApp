import { axiosApiClient } from '@/api/axiosApiClient';
import { Category } from '@/interfaces/categories.interface';
import { ServerError } from '@/interfaces/serverError.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface State {
  categories: Category[];
  selectedCategory: Category | null;
  error: null | string;
  errors: { type: string; messages: string[] }[];
  message: string[];
  isLoading: boolean;
}

const initialState: State = {
  categories: [],
  selectedCategory: null,
  error: null,
  errors: [],
  message: [],
  isLoading: false,
};

export const fetchCategories = createAsyncThunk('fetch/categories', async () => {
  const { data } = await axiosApiClient.get('/categories');
  return data;
});

export const fetchCategoryById = createAsyncThunk<Category, string>('fetch/categoryById', async (id: string) => {
  const { data } = await axiosApiClient.get<Category>(`/categories/${id}`);
  return data;
});

export const createCategory = createAsyncThunk<Category, FormData, { rejectValue: ServerError }>(
  'post/categories',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.post<Category>('/categories', payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while creating category'] }] });
    }
  }
);

export const editCategory = createAsyncThunk<Category, { id: string; formData: FormData },{ rejectValue: ServerError }>(
  'edit/category', 
  async (payload, { rejectWithValue }) => {
  const { id, formData } = payload;
  try {
    const { data } = await axiosApiClient.put<Category>(`/categories/${id}`, formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.data) {
      return rejectWithValue(error.response.data as ServerError);
    }
    return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while editing category'] }] });
  }
});

export const deleteCategory = createAsyncThunk<void, string, { rejectValue: ServerError }>(
  'delete/category',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.delete(`/categories/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while editing category'] }] });
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchCategories';
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchCategoryById';
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.errors || [{ type: 'general', messages: ['Error creating category'] }];
      })
      .addCase(editCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.selectedCategory = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.errors || [{ type: 'general', messages: ['Error editing category'] }];
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.meta.arg);
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message ? [action.payload.message] : [];
      });
  },
});

export default categorySlice;
