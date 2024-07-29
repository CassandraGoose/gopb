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
            color={restaurant.category === "Restaurant" ? "#90E0C5" : "#F292A0"}
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