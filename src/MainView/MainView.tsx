import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import store from "../app/store";
import { ILocation } from "../interfaces";
import { getLocations } from "../app/locationSlice";
import MapFormControls from "./ViewFormControls/ViewFormControls";
import MainMap from "./MapView/MainMap";
import ListView from "./ListView";
import LocationDetails from "./Components/LocationDetails";
import { getSingleLocation } from "../app/locationSlice";

export default function MainView() {
  const [viewingRestaurants, setViewingRestaurants] = useState<
    ILocation[] | []
  >([]);
  const [mapView, setMapView] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch<typeof store.dispatch>();
  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  useEffect(() => {
    const currentLocation = searchParams.get("location") || "";
    if (currentLocation) {
      dispatch(getSingleLocation(currentLocation));
    }
  }, [searchParams, dispatch]);

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
        setMapView={setMapView}
        mapView={mapView}
      />
      {mapView && (
        <MainMap
          restaurants={viewingRestaurants}
          setSearchParams={setSearchParams}
          selectedLocation={selectedLocation}
        />
      )}
      {!mapView && (
        <ListView
          restaurants={viewingRestaurants}
          setSearchParams={setSearchParams}
          selectedLocation={selectedLocation}
        />
      )}
      {selectedLocation && <LocationDetails location={selectedLocation} />}
    </>
  );
}
