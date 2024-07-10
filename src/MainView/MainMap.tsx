import { useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";
import { ILocation } from "../interfaces";
import { Overlay } from "pigeon-maps";
import { Card, Button, Badge, Stats } from "react-daisyui";

export default function MainMap({
  restaurants,
}: {
  restaurants: ILocation[] | [];
}) {
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>(null);

  return (
    <>
      <Map height={450} defaultCenter={[39.74, -104.99]} defaultZoom={12}>
        <ZoomControl style={{ left: "auto", right: "10px" }} />

        {restaurants.map((restaurant) => {
          const { lat, long, name, category } = restaurant;
          const color = category === "Restaurant" ? "purple" : "green";
          return (
            <Marker
              key={name}
              width={50}
              anchor={[lat, long]}
              color={color}
              onClick={() => setCurrentLocation(restaurant)}
            />
          );
        })}
        {/* why isn't this in it's own component? */}
        {/* the overlay loses context when it's in it's own component, unfortunately and it's more complicated than it's worth to determine how to pass that context through as pigeon maps isn't a full-fledge solution at this time */}
        {currentLocation && (
          <Overlay className="w-96" anchor={([currentLocation.lat, currentLocation.long])} offset={[5, 25]}>
          <Card className="bg-neutral text-base-100 m-4 py-2 rounded gap-2">
            <Card.Body className="py-2">
            <div>
              <button
                className="btn btn-square btn-sm absolute right-0 top-0 mt-2 mr-2"
                onClick={() => setCurrentLocation(null)}
              >
                X
              </button>
            </div>
              <Card.Title tag="h2">{currentLocation.name}</Card.Title>
              <div className="flex flex-row gap-2 max-w-[100%] flex-wrap">
                {currentLocation.tags.map((tag) => {
                  return (
                    <Badge key={tag + currentLocation.lat} color="secondary">
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
                    <Stats.Stat.Item variant="desc" className="whitespace-normal">
                      collected from GOPB users
                    </Stats.Stat.Item>
                  </Stats.Stat>
                  <Stats.Stat>
                    <Stats.Stat.Item variant="title">Editor Rating</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value">4.8/5</Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc" className="whitespace-normal">
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
        </Overlay>
        )}
      </Map>
    </>
  );
}
