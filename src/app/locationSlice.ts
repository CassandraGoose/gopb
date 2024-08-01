import { createSlice } from '@reduxjs/toolkit';
import store from './store';

export const locationSlice = createSlice({
  name: 'mapFunctionality',
  initialState: {
    locations: [],
    currentLocation: null,
  },
  reducers: {
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setSingleLocation: (state, action) => {
      state.currentLocation = action.payload;
    }
  }
});

export const getLocations = () => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`);
      if (!response.ok) throw new Error("Error in response");
      const locations = await response.json();
      dispatch(setLocations(locations));
    } catch(error) {
      console.error("Failed to fetch locations: " + error);
    }
  }
}

export const getSingleLocation = (id: string) => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      if (!id) dispatch(setSingleLocation(null));
      else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/locations/${id}`);
        if (!response.ok) throw new Error("Error in response");
        const location = await response.json();
        dispatch(setSingleLocation(location));
      }
    } catch(error) {
      console.error("Failed to fetch location: " + error);
    }
  }
}

export const { setLocations, setSingleLocation } = locationSlice.actions;

export default locationSlice.reducer;