import { Overlay } from "pigeon-maps";
import { Card, Button, Badge } from "react-daisyui";
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

  console.log(lat, long)
  return (
    <Overlay>
      <Card className="bg-neutral text-base-100 m-4 p-4 rounded flex flex-col gap-2 w-96">
        <div>
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
          <div className="flex flex-row gap-2 max-w-[100%] flex-wrap">
            {tags.map((tag) => {
              return (<Badge key="tag" color="secondary">
                {tag}
              </Badge>)
            })}
          </div>
          <Card.Actions className="flex justify-center items-center pt-4">
            <Button color="primary" className="rounded">See on Google Maps</Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </Overlay>
  );
}
