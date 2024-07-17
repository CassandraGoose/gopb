import { Table, Mask, Badge, Stats, Button } from "react-daisyui";
import { ILocation } from "../interfaces";
import placeHolder from "../assets/placeholder_restaurant.png";

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
        {restaurants.map(
          ({ name, cuisine, userRating, editorRating, address }) => {
            return (
              <Table.Row key={`listview-${name}-location`} className={selectedLocation && selectedLocation.name === name ? 'bg-accent' : ''}>
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
                <div className="text-sm text-gray-500 space-x-1 space-y-2">
                  {cuisine.map((cuisine) => {
                    return (
                      <Badge key={cuisine + name} color="accent">
                        {cuisine}
                      </Badge>
                    );
                  })}
                </div>

                <Stats className="shadow font-sans">
                  <Stats.Stat className="place-items-center">
                    <Stats.Stat.Item variant="title">
                      User Rating:
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="value">
                      {userRating}/5
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      collected from GOPB users
                    </Stats.Stat.Item>
                  </Stats.Stat>

                  <Stats.Stat className="place-items-center">
                    <Stats.Stat.Item variant="title">
                      Editor Rating:
                    </Stats.Stat.Item>
                    <Stats.Stat.Item variant="value">
                      {editorRating}/5
                    </Stats.Stat.Item>
                  </Stats.Stat>
                </Stats>
                <Button
                  color="primary"
                  className="rounded join-item"
                  onClick={() => setSearchParams({ selectedLocation: name })}
                >
                  See More Information
                </Button>
              </Table.Row>
            );
          }
        )}
      </Table.Body>
    </Table>
  );
}
