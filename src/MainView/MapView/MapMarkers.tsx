import { Marker, MapMouseEvent } from "react-map-gl";
import { ILocation } from "../../interfaces";

export default function MapMarkers({
  restaurants,
  setSelectedMapLocation,
}: {
  restaurants: ILocation[];
  setSelectedMapLocation: React.Dispatch<
    React.SetStateAction<ILocation | null>
  >;
}) {
  return (
    <>
      {restaurants.map((restaurant) => {
        return (
          <Marker
            color={restaurant.category === "Restaurant" ? "#A7E6D1" : "#F8C3CB"}
            key={restaurant.name}
            longitude={restaurant.long}
            latitude={restaurant.lat}
            anchor="bottom"
            offset={[0, 0]}
            onClick={(e: MapMouseEvent) => {
              e.originalEvent.stopPropagation();
              setSelectedMapLocation(restaurant);
            }}
          />
        );
      })}
    </>
  );
}
