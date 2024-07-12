import { Card, Button, Badge } from "react-daisyui";
import { ILocation } from "../interfaces";
import LocationStats from "./LocationStats";
import placeholder from "../assets/placeholder_restaurant.png";

export default function LocationDetails({
  location,
}: {
  location: ILocation | null;
}) {
  if (location === null) return <p>Error showing location details.</p>;

  const {
    name,
    category,
    tags,
    address,
    cuisine,
    dateUpdated,
    plantBasedLevel,
    menu,
  } = location;

  return (
    <Card side="lg" className="my-8 bg-neutral rounded ">
      <Card.Body>
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-col gap-2 w-2/3 pr-20">
            <Card.Title tag="h2">{name}</Card.Title>
            <p>{address}</p>
            <p>{category}</p>
            <div className="flex flex-row gap-2 max-w-[100%] flex-wrap">
              {cuisine.map((cuisine) => {
                return (
                  <Badge key={cuisine + name} color="accent">
                    {cuisine}
                  </Badge>
                );
              })}
            </div>
          </div>
          <div className="w-1/4">
            <LocationStats location={location} />
          </div>
        </div>
        <Card className="bg-accent rounded border-accent my-8">
          <Card.Body>
            <Card.Title tag="h3">
              Menu:{" "}
              {plantBasedLevel === "full"
                ? "Fully Plant Based Menu"
                : "Includes Plant Based Options"}
            </Card.Title>
            <p>Menu Aquired on: {dateUpdated}</p>
            <p>{menu}</p>
          </Card.Body>
        </Card>

        <div className="flex justify-between items-center mb-8 mt-4">
          <div className="h-auto w-44">
            <img src={placeholder} alt="placeholder" />
          </div>
          <div className="h-auto w-44">
            <img src={placeholder} alt="placeholder" />
          </div>
          <div className="h-auto w-44">
            <img src={placeholder} alt="placeholder" />
          </div>
          <div className="h-auto w-44">
            <img src={placeholder} alt="placeholder" />
          </div>
          <div className="h-auto w-44">
            <img src={placeholder} alt="placeholder" />
          </div>
        </div>
        <Card.Actions className="justify-end flex justify-between">
          <div>
            <p>Tags:</p>
            <div className="flex flex-row gap-2 max-w-[100%] flex-wrap">
              {tags.map((tag) => {
                return (
                  <Badge key={tag + name} color="accent">
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${name} denver`}
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bg-light rounded">View on Google Maps</Button>
          </a>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}
