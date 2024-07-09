import { useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import MapOverlay from "./MapOverlay";

export default function MainMap({
  restaurants,
}: {
  restaurants:
    | [
        {
          lat: number;
          long: number;
          category: string;
          tags: string[];
          cuisine: string[];
          name: string;
          dateUpdated: string;
          plantBasedLevel: string;
          menu: string;
        }
      ]
    | [];
}) {
  const [overlay, setOverlay] = useState<JSX.Element | null>(null);

  const createRestaurantOverlay = (restaurant: {
    name: string;
    lat: number;
    long: number;
    tags: string[];
  }) => {
    setOverlay(
      <MapOverlay locationData={restaurant} setOverlay={setOverlay} />
    );
  };

  return (
    <>
      <Map height={500} defaultCenter={[39.74, -104.99]} defaultZoom={12}>
        <ZoomControl />
        {restaurants.map(({ name, lat, long, category, tags }) => {
          const color = category === "Restaurant" ? "purple" : "green";
          return (
            <Marker
              key={name}
              width={50}
              anchor={[lat, long]}
              color={color}
              onClick={() => createRestaurantOverlay({ name, lat, long, tags })}
            />
          );
        })}
        {overlay && overlay}
      </Map>
    </>
  );
}
