import { configureStore } from '@reduxjs/toolkit';
import locationSlice from './locationSlice';

export default configureStore({
  reducer: {
    mapFunctionality: locationSlice
  }
});