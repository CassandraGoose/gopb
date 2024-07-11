import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ILocation } from "../interfaces";
import { getLocations } from "./locationSlice";
import MapFormControls from "./MapFormControls";
import MainMap from "./MainMap";

export default function MainView() {
  // const [restaurants, setRestaurants] = useState<ILocation[] | []>([]);
  const [viewingRestaurants, setViewingRestaurants] = useState<
    ILocation[] | []
  >([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  // TODO we don't know the type yet.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const locations = useSelector((state: any) => state.locations);

  return (
    <>
      <MapFormControls
        restaurants={locations}
        setViewingRestaurants={setViewingRestaurants}
      />
      <MainMap restaurants={viewingRestaurants} />
    </>
  );
}
