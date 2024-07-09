import { useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { ILocation } from "../interfaces";
import MapOverlay from "./MapOverlay";

export default function MainMap({
  restaurants,
}: {
  restaurants: [ILocation] | [];
}) {
  const [overlay, setOverlay] = useState<JSX.Element | null>(null);

  const createRestaurantOverlay = (restaurant: ILocation) => {
    setOverlay(
      <MapOverlay locationData={restaurant} setOverlay={setOverlay} />
    );
  };

  return (
    <>
      <Map height={500} defaultCenter={[39.74, -104.99]} defaultZoom={12}>
        <ZoomControl />
        {restaurants.map((restaurant) => {
          const { lat, long, name, category } = restaurant;
          const color = category === "Restaurant" ? "purple" : "green";
          return (
            <Marker
              key={name}
              width={50}
              anchor={[lat, long]}
              color={color}
              onClick={() => createRestaurantOverlay(restaurant)}
            />
          );
        })}
        {overlay && overlay}
      </Map>
    </>
  );
}
