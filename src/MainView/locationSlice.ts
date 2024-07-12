import { createSlice } from '@reduxjs/toolkit';
import store from '../app/store';
import { ILocation } from "../interfaces";

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
      const response = await fetch("/restaurants.json");
      if (!response.ok) throw new Error("Error in response");
      const json = await response.json();
      // remove when getting real data
      const restaurants = json.map(
        (item: ILocation) => {
          item.lat = parseFloat(item.lat as unknown as string);
          item.long = parseFloat(item.long as unknown as string);
          item.userRating = parseFloat(item.userRating as unknown as string);
          item.editorRating = parseFloat(item.editorRating as unknown as string);
          item.menu = item.menu.map((item) => item.toLowerCase());
          return item;
        }
      );
      dispatch(setLocations(restaurants));
    } catch(error) {
      console.error("Failed to fetch restaurants: " + error);
    }
  }
}

export const getSingleLocation = (name: string) => {
  return async (dispatch: typeof store.dispatch) => {
    try {
      // change this whole thing when making a real request
      const response = await fetch("/restaurants.json");
      if (!response.ok) throw new Error("Error in response");
      const json = await response.json();
      const restaurant = json.find((item: ILocation) => item.name === name);
      dispatch(setSingleLocation(restaurant));
    } catch(error) {
      console.error("Failed to fetch restaurants: " + error);
    }
  }
}

export const { setLocations, setSingleLocation } = locationSlice.actions;

export default locationSlice.reducer;