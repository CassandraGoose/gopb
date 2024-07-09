import { Overlay } from "pigeon-maps";
import { Card, Button } from "react-daisyui";
import { ILocation } from "../interfaces";
import restaurantPlaceholder from "../assets/placeholder_restaurant.png";

export default function MapOverlay({
  locationData,
  setOverlay,
}: {
  locationData: ILocation;
  setOverlay: React.Dispatch<React.SetStateAction<JSX.Element | null>>;
}) {
  const { lat, long, name, tags } = locationData;

  return (
    <Overlay anchor={[lat, long]} offset={[-5, 15]}>
      <Card side compact className="bg-neutral text-base-100">
        <div className="absolute right-[3%] top-[5%] text-white">
          <button
            className="btn btn-square btn-sm"
            onClick={() => setOverlay(null)}
          >
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
          <p>{tags.join(" ")}</p>
          <Card.Actions className="justify-end">
            <Button color="primary">See on Google Maps</Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </Overlay>
  );
}
