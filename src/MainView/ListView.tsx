import { Table, Mask, Button } from "react-daisyui";
import { ILocation } from "../interfaces";
import placeHolder from "../assets/placeholder_restaurant.png";
import LocationStats from "./Components/LocationStats";
import BadgeList from "./Components/BadgeList";

export default function ListView({
  restaurants,
  setSearchParams,
  selectedLocation,
}: {
  restaurants: ILocation[];
  setSearchParams: (params: Record<string, string>) => void;
  selectedLocation: ILocation;
}) {
  return (
    <Table className="rounded-box">
      <Table.Head>
        <span>Location</span>
        <span>Cuisine</span>
        <span>Ratings</span>
      </Table.Head>
      <Table.Body>
        {restaurants.map((location) => {
          const { name, cuisine, address } = location;
          return (
            <Table.Row
              key={`listview-${name}-location`}
              className={
                selectedLocation && selectedLocation.name === name
                  ? "bg-accent"
                  : ""
              }
            >
              <div className="flex items-center space-x-3 truncate">
                <Mask
                  className="max-w-16"
                  variant="squircle"
                  src={placeHolder}
                  alt={`user added image of ${name} location`}
                />
                <div className="flex flex-col">
                  <div className="font-bold text-xl">{name}</div>
                  <div className="text-sm text-gray-500">{address}</div>
                </div>
              </div>
              <BadgeList items={cuisine} locationName={name} />
              <LocationStats location={location} />
              <Button
                color="primary"
                className="rounded join-item"
                onClick={() => setSearchParams({ selectedLocation: name })}
              >
                See More Information
              </Button>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}
