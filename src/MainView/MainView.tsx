import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import store from "../app/store";
import { ILocation } from "../interfaces";
import { getLocations } from "./locationSlice";
import MapFormControls from "./MapFormControls";
import MainMap from "./MainMap";
import LocationDetails from "./LocationDetails";
import { getSingleLocation } from './locationSlice';

export default function MainView() {
  const [viewingRestaurants, setViewingRestaurants] = useState<
    ILocation[] | []
  >([]);

  const [searchParams] = useSearchParams();

  const dispatch = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  useEffect(() => {
    const currentLocation = searchParams.get('selectedLocation') || '';

    dispatch(getSingleLocation(currentLocation));

  }, [searchParams, dispatch])

    // TODO we don't know the type yet.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const locations = useSelector((state: any) => state.mapFunctionality.locations) || [];
      // TODO we don't know the type yet.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const selectedLocation = useSelector((state: any) => state.mapFunctionality.currentLocation) || null;

  return (
    <>
      <MapFormControls
        restaurants={locations}
        setViewingRestaurants={setViewingRestaurants}
      />
      <MainMap restaurants={viewingRestaurants} />
      {selectedLocation && (<LocationDetails location={selectedLocation} />)}
    </>
  );
}
