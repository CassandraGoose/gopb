import { Card, Button } from "react-daisyui";
import { ILocation } from "../../interfaces";
import LocationStats from "./LocationStats";
import BadgeList from "./BadgeList";
import placeholder from "../../assets/placeholder_restaurant.png";

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
            <BadgeList items={cuisine} locationName={name} />
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

        <Card className="bg-secondary rounded border-secondary my-4">
          <Card.Body>
            <Card.Title tag="h3">Reviews</Card.Title>
            <Card className="bg-primary rounded border-primary">
              <Card.Body>
                <Card.Title>
                  <p>Editor Review: 07/15/2024</p>
                </Card.Title>
                <p>
                  PLACEHOLDER: Located in the heart of the city, this vegan
                  restaurant offers a delightful array of plant-based dishes
                  crafted with fresh, locally sourced ingredients. From their
                  innovative takes on classic comfort foods to their vibrant
                  salads and delectable desserts, each dish reflects a
                  commitment to both flavor and sustainability. The cozy
                  ambiance and attentive service make it a perfect spot for both
                  seasoned vegans and curious diners looking to explore
                  plant-based cuisine.
                </p>
              </Card.Body>
            </Card>
            <Card className="bg-primary rounded border-primary">
              <Card.Body>
                <Card.Title>
                  <p>Angela's Review: 07/15/2024</p>
                </Card.Title>
                <p>
                  PLACEHOLDER: Located in the heart of the city, this vegan
                  restaurant offers a delightful array of plant-based dishes
                  crafted with fresh, locally sourced ingredients. From their
                  innovative takes on classic comfort foods to their vibrant
                  salads and delectable desserts, each dish reflects a
                  commitment to both flavor and sustainability. The cozy
                  ambiance and attentive service make it a perfect spot for both
                  seasoned vegans and curious diners looking to explore
                  plant-based cuisine.
                </p>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>

        <Card.Actions className="justify-end flex justify-between">
          <div>
            <p>Tags:</p>
            <BadgeList items={tags} locationName={name} />
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
