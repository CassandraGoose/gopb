import { useState } from "react";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import { Card, Button } from "react-daisyui";
import restaurantPlaceholder from "./assets/placeholder_restaurant.png";

export default function MainMap({
  restaurants,
}: {
  restaurants:
    | [{ lat: number; long: number; color: string; name: string }]
    | [];
}) {
  const [overlay, setOverlay] = useState<JSX.Element | null>(null);

  const createRestaurantOverlay = (name: string, lat: number, long: number) => {
    setOverlay(
      <Overlay anchor={[lat, long]} offset={[-5, 15]}>
        <Card side compact className="bg-neutral text-base-100">
          <div className="absolute right-[3%] top-[5%] text-white">
            <button className="btn btn-square btn-sm" onClick={() => setOverlay(null)}>
              X
            </button>
          </div>
          <Card.Image
            className="w-28 h-auto"
            src={restaurantPlaceholder}
            alt="Generic vegan restaurant at night"
          />
          <Card.Body>
            <Card.Title tag="h2">{name}</Card.Title>
            <p>Description goes here</p>
            <Card.Actions className="justify-end">
              <Button color="primary">See on Google Maps</Button>
            </Card.Actions>
          </Card.Body>
        </Card>
      </Overlay>
    );
  };

  return (
    <Map height={500} defaultCenter={[39.74, -104.99]} defaultZoom={12}>
      <ZoomControl />
      {restaurants.map(({ name, lat, long, color }) => {
        return (
          <Marker
            key={name}
            width={50}
            anchor={[lat, long]}
            color={color}
            onClick={() => createRestaurantOverlay(name, lat, long)}
          />
        );
      })}
      {overlay && overlay}
    </Map>
  );
}
