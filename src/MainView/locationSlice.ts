import { createSlice } from '@reduxjs/toolkit';
import store from '../app/store';
import { ILocation } from "../interfaces";

export const locationSlice = createSlice({
  name: 'locations',
  initialState: [],
  reducers: {
    setLocations: (state, action) => {
      return action.payload;
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

export const { setLocations } = locationSlice.actions;

export default locationSlice.reducer;