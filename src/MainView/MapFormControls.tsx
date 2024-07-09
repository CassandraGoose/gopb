import { ChangeEvent } from "react";
import { Input, Select } from "react-daisyui";

export default function MapFormControls({
  restaurants,
  setViewingRestaurants,
}: {
  restaurants:
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
    | [];
    setViewingRestaurants: React.Dispatch<React.SetStateAction<[] | [{
      lat: number;
      long: number;
      category: string;
      tags: string[];
      cuisine: string[];
      name: string;
      dateUpdated: string;
      plantBasedLevel: string;
      menu: string;
  }]>>
}) {

  const allCuisineOptions = Array.from(
    new Set(restaurants.map((rest) => rest.cuisine).flat())
  );
  allCuisineOptions.unshift("Any");

  const handleLocationChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Any") {
      setViewingRestaurants(restaurants);
    }
    const updatedRestaurants = e.target.value === "Any" ? restaurants : restaurants.filter((rest) => rest.category === e.target.value)
    setViewingRestaurants(updatedRestaurants);
  }
  return (
    <form className="flex w-full component-preview pb-2 items-center justify-start gap-2">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Search by keyword, food, etc:</span>
        </label>
        <Input className="rounded" placeholder="Search..." />
      </div>
      <div className="form control">
        <label className="label">
          <span className="label-text">Location Type:</span>
        </label>
        <Select
          className="rounded border-1"
          defaultValue={"Any"}
          onChange={(e) => handleLocationChange(e)}
        >
          <Select.Option value="Any">Any</Select.Option>
          <Select.Option value="Restaurant">Restaurant</Select.Option>
          <Select.Option value="Grocery">Grocery</Select.Option>
        </Select>
      </div>
      <div className="form control">
        <label className="label">
          <span className="label-text">Cuisine Type:</span>
        </label>
        <Select
          className="rounded border-1"
          defaultValue={"Any"}
          onChange={() => console.log("changed!")}
        >
          {allCuisineOptions.map((cuisine) => {
            return (
              <Select.Option key={cuisine} value={cuisine}>
                {cuisine}
              </Select.Option>
            );
          })}
        </Select>
      </div>
      <div className="form control">
        <label className="label">
          <span className="label-text">Cuisine Type:</span>
        </label>
        <Select
          className="rounded border-1"
          defaultValue={"Any"}
          onChange={() => console.log("changed!")}
        >
          <Select.Option value="Any">Any</Select.Option>
          <Select.Option value="Fully Plant-Based">
            Fully Plant Based
          </Select.Option>
          <Select.Option value="Partially Plant-Based">
            Partiallay Plant-Based
          </Select.Option>
        </Select>
      </div>
    </form>
  );
}
