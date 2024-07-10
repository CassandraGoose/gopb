import { useState } from "react";
import { ILocation } from "../interfaces";
import { Card, Button, Badge, Stats } from "react-daisyui";
import Map, {
  NavigationControl,
  AttributionControl,
  Marker,
  Popup,
  MapMouseEvent,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MainMap({
  restaurants,
}: {
  restaurants: ILocation[] | [];
}) {
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
    null
  );

  return (
    <>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAP_TOKEN}
        initialViewState={{ longitude: -104.99, latitude: 39.74, zoom: 10 }}
        style={{ width: "100%", height: "45vh" }}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <NavigationControl showCompass showZoom />
        <AttributionControl compact />
        {restaurants.map((restaurant) => {
          return (
            <Marker
              color={restaurant.category === 'Restaurant' ? '#A7E6D1' : '#F8C3CB'}
              key={restaurant.name}
              longitude={restaurant.long}
              latitude={restaurant.lat}
              anchor="bottom"
              offset={[0, 0]}
              onClick={(e: MapMouseEvent) => {
                e.originalEvent.stopPropagation();
                setSelectedLocation(restaurant);
              }}
            />
          );
        })}
        {selectedLocation && (
          <Popup
            focusAfterOpen
            closeOnClick
            longitude={selectedLocation.long}
            latitude={selectedLocation.lat}
            onClose={() => setSelectedLocation(null)}
            anchor="top"
            maxWidth="700px"
          >
            <Card className="bg-base-100 py-2 rounded gap-2">
              <Card.Body className="py-2 w-96">
                <div>
                  <button
                    className="btn btn-square btn-sm absolute right-0 top-0 mt-2 mr-2"
                    onClick={() => setSelectedLocation(null)}
                  >
                    X
                  </button>
                </div>
                <Card.Title tag="h2">{selectedLocation.name}</Card.Title>
                <div className="flex flex-row gap-2 max-w-[100%] flex-wrap">
                  {selectedLocation.tags.map((tag) => {
                    return (
                      <Badge key={tag + selectedLocation.lat} color="accent">
                        {tag}
                      </Badge>
                    );
                  })}
                </div>
                <div className="flex flex-row justify-center items-center">
                  <Stats className="font-sans bg-primary text-primary-content rounded stats-horizontal">
                    <Stats.Stat>
                      <Stats.Stat.Item variant="title">Rating</Stats.Stat.Item>
                      <Stats.Stat.Item variant="value">4.5/5</Stats.Stat.Item>
                      <Stats.Stat.Item
                        variant="desc"
                        className="whitespace-normal"
                      >
                        collected from GOPB users
                      </Stats.Stat.Item>
                    </Stats.Stat>
                    <Stats.Stat>
                      <Stats.Stat.Item variant="title">
                        Editor Rating
                      </Stats.Stat.Item>
                      <Stats.Stat.Item variant="value">4.8/5</Stats.Stat.Item>
                      <Stats.Stat.Item
                        variant="desc"
                        className="whitespace-normal"
                      >
                        based on editor's personal experience
                      </Stats.Stat.Item>
                    </Stats.Stat>
                  </Stats>
                </div>
                <Card.Actions className="flex justify-center items-center pt-4">
                  <Button color="primary" className="rounded join-item">
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
