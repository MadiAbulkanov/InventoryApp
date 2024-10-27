import categorySlice from '@/features/categories/categories.slice';
import placeSlice from '@/features/places/places.slice';
import productSlice from '@/features/products/prdoucts.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { 
    [productSlice.name]: productSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [placeSlice.name]: placeSlice.reducer,
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
