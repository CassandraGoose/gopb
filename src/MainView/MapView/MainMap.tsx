import { useState } from "react";
import Map, {
  NavigationControl,
  AttributionControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { ILocation } from "../../interfaces";
import MapMarkers from "./MapMarkers";
import MapPopup from "./MapPopup";

export default function MainMap({
  restaurants,
  setSearchParams,
  selectedLocation,
}: {
  restaurants: ILocation[] | [];
  setSearchParams: (params: Record<string, string>) => void;
  selectedLocation: ILocation | null;
}) {
  const [selectedMapLocation, setSelectedMapLocation] =
    useState<ILocation | null>(null);

  const clearLocation = () => {
    setSelectedMapLocation(null);
    setSearchParams({});
  };

  const viewableLocation = selectedMapLocation || selectedLocation;

  return (
    <>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
        initialViewState={{ longitude: -104.99, latitude: 39.74, zoom: 10 }}
        style={{ width: "100%", height: "55vh" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <NavigationControl showCompass showZoom />
        <AttributionControl compact />
        <MapMarkers
          restaurants={restaurants}
          setSelectedMapLocation={setSelectedMapLocation}
        />
        {viewableLocation && <MapPopup viewableLocation={viewableLocation} clearLocation={clearLocation} setSearchParams={setSearchParams} />}
      </Map>
    </>
  );
}
