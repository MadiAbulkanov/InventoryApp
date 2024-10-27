import { axiosApiClient } from '@/api/axiosApiClient';
import { Place } from '@/interfaces/place.interface';
import { ServerError } from '@/interfaces/serverError.interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface State {
  places: Place[];
  selectedPlace: Place | null;
  error: null | string;
  errors: { type: string; messages: string[] }[];
  message: string[];
  isLoading: boolean;
}

const initialState: State = {
  places: [],
  selectedPlace: null,
  error: null,
  errors: [],
  message: [],
  isLoading: false,
};

export const fetchPlaces = createAsyncThunk<Place[]>('fetch/places', async () => {
  const { data } = await axiosApiClient.get<Place[]>('/places');
  return data;
});

export const fetchPlaceById = createAsyncThunk<Place, string>('fetch/placeById', async (id: string) => {
  const { data } = await axiosApiClient.get<Place>(`/places/${id}`);
  return data;
});

export const createPlace = createAsyncThunk<Place, FormData, { rejectValue: ServerError }>(
  'post/places',
  async (payload: FormData, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.post<Place>('/places', payload);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while creating place'] }] });
    }
  }
);

export const editPlace = createAsyncThunk<Place, { id: string; formData: FormData }, { rejectValue: ServerError }>(
  'edit/place',
  async (payload, { rejectWithValue }) => {
    const { id, formData } = payload;
    try {
      const { data } = await axiosApiClient.put<Place>(`/places/${id}`, formData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while editing place'] }] });
    }
  }
);

export const deletePlace = createAsyncThunk<void, string, { rejectValue: ServerError }>(
  'delete/place',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axiosApiClient.delete(`/places/${id}`);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        return rejectWithValue(error.response.data as ServerError);
      }
      return rejectWithValue({ errors: [{ type: 'general', messages: ['Error while deleting place'] }] });
    }
  }
);

const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchPlaces.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.places = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchPlaces';
      })
      .addCase(fetchPlaceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchPlaceById.fulfilled, (state, action) => {
        state.selectedPlace = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(fetchPlaceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchPlaceById';
      })
      .addCase(createPlace.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        state.places.push(action.payload);
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.errors || [{ type: 'general', messages: ['Error creating place'] }];
      })
      .addCase(editPlace.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(editPlace.fulfilled, (state, action) => {
        state.selectedPlace = action.payload;
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(editPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload?.errors || [{ type: 'general', messages: ['Error editing place'] }];
      })
      .addCase(deletePlace.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.places = state.places.filter((place) => place.id !== action.meta.arg);
        state.isLoading = false;
        state.error = null;
        state.errors = [];
        state.message = [];
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload?.message ? [action.payload.message] : [];
      });
  },
});

export default placeSlice;
