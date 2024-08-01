import { Popup } from "react-map-gl";
import { Card, Button } from "react-daisyui";
import LocationStats from "../Components/LocationStats";
import BadgeList from "../Components/BadgeList";
import { ILocation } from "../../interfaces";
export default function MapPopup({
  viewableLocation,
  clearLocation,
  setSearchParams,
}: {
  viewableLocation: ILocation;
  clearLocation: () => void;
  setSearchParams: (params: Record<string, string>) => void;
}) {
  return (
    <Popup
      focusAfterOpen
      closeOnClick
      longitude={viewableLocation.long}
      latitude={viewableLocation.lat}
      anchor="top"
      maxWidth="700px"
      onClose={() => clearLocation()}
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
          <BadgeList
            items={viewableLocation.tags}
            locationName={viewableLocation.name}
          />
          <LocationStats location={viewableLocation} />
          <Card.Actions className="flex justify-center items-center pt-4">
            <Button
              color="primary"
              className="rounded join-item"
              onClick={() =>
                setSearchParams({
                  location: viewableLocation.id,
                })
              }
            >
              See More Information
            </Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </Popup>
  );
}
