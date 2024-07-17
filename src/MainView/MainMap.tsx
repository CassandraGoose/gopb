import { useState } from "react";
import { Card, Button, Badge } from "react-daisyui";
import Map, {
  NavigationControl,
  AttributionControl,
  Marker,
  Popup,
  MapMouseEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import LocationStats from "./LocationStats";
import { ILocation } from "../interfaces";

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
    console.log("hi its me")
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
        {restaurants.map((restaurant) => {
          return (
            <Marker
              color={
                restaurant.category === "Restaurant" ? "#A7E6D1" : "#F8C3CB"
              }
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
        {viewableLocation && (
          <Popup
            focusAfterOpen
            closeOnClick
            longitude={viewableLocation.long}
            latitude={viewableLocation.lat}
            anchor="top"
            maxWidth="700px"
          >
            <Card className="bg-base-100 py-2 rounded gap-2">
              <Card.Body className="py-2 w-96">
                <div>
                  <button
                    className="btn btn-square btn-sm absolute right-0 top-0 mt-2 mr-2"
                    onClick={() => clearLocation()}
                  >
                    X
                  </button>
                </div>
                <Card.Title tag="h2">{viewableLocation.name}</Card.Title>
                <div className="flex flex-row gap-2 max-w-[100%] flex-wrap">
                  {viewableLocation.tags.map((tag: string) => {
                    return (
                      <Badge key={tag + viewableLocation.lat} color="accent">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
                <LocationStats location={viewableLocation} />
                <Card.Actions className="flex justify-center items-center pt-4">
                  <Button
                    color="primary"
                    className="rounded join-item"
                    onClick={() =>
                      setSearchParams({ selectedLocation: viewableLocation.name })
                    }
                  >
                    See More Information
                  </Button>
                </Card.Actions>
              </Card.Body>
            </Card>
          </Popup>
        )}
      </Map>
    </>
  );
}
