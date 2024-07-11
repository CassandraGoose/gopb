import { configureStore } from '@reduxjs/toolkit';
import locationSlice from '../MainView/locationSlice';

export default configureStore({
  reducer: {
    mapFunctionality: locationSlice
  }
});