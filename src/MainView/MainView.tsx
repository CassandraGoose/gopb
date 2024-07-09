import { useState, useEffect } from "react";
import MapFormControls from "./MapFormControls";
import MainMap from "./MainMap";

export default function MainView() {
  const [restaurants, setRestaurants] = useState<
    | [
        {
          lat: number;
          long: number;
          category: string;
          tags: string[];
          cuisine: string[];
          name: string;
          dateUpdated: string;
          plantBasedLevel: string;
          menu: string;
        }
      ]
    | []
  >([]);
  const [viewingRestaurants, setViewingRestaurants] = useState<
  | [
      {
        lat: number;
        long: number;
        category: string;
        tags: string[];
        cuisine: string[];
        name: string;
        dateUpdated: string;
        plantBasedLevel: string;
        menu: string;
      }
    ]
  | []
>([]);

  useEffect(() => {
    async function getRestaurants() {
      try {
        const response = await fetch("/restaurants.json");
        if (!response.ok) throw new Error("Error in response");
        const json = await response.json();
        // remove when getting real data
        const restaurants = json.map(
          (item: {
            name: string;
            lat: string | number;
            long: string | number;
            color: string;
          }) => {
            item.lat = parseFloat(item.lat as string);
            item.long = parseFloat(item.long as string);
            return item;
          }
        );
        setRestaurants(restaurants);
        setViewingRestaurants(restaurants);
      } catch (error) {
        console.error("Failed to fetch restaurants: " + error);
      }
    }

    getRestaurants();
  }, []);

  return (
    <>
      <MapFormControls restaurants={restaurants} setViewingRestaurants={setViewingRestaurants} />
      <MainMap restaurants={viewingRestaurants}/>
    </>
  );
}
