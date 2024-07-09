import { ChangeEvent } from "react";
import { Input, Select } from "react-daisyui";
import { ILocation } from "../interfaces";

export default function MapFormControls({
  restaurants,
  setViewingRestaurants,
}: {
  restaurants: [ILocation] | [];
  setViewingRestaurants: React.Dispatch<React.SetStateAction<[] | [ILocation]>>;
}) {
  const allCuisineOptions = Array.from(
    new Set(restaurants.map((rest) => rest.cuisine).flat())
  );
  allCuisineOptions.unshift("Any");

  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement>,
    type: string
  ) => {
    let updatedRestaurants = restaurants;
    console.log("hi1", updatedRestaurants);

    switch (type) {
      case "category":
        if (e.target.value !== "Any")
          updatedRestaurants = restaurants.filter(
            (rest) => rest.category === e.target.value
          ) as [ILocation];
        break;
      case "cuisine":
        if (e.target.value !== "Any")
          updatedRestaurants = restaurants.filter((rest) =>
            rest.cuisine.includes(e.target.value)
          )  as [ILocation];
        break;
      case "plantBasedLevel":
        if (e.target.value !== "Any")
          updatedRestaurants = restaurants.filter(
            (rest) => rest.plantBasedLevel === e.target.value
          )  as [ILocation];
        break;
      default:
        break;
    }
    console.log("hi2", updatedRestaurants);
    setViewingRestaurants(updatedRestaurants);
  };

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
          onChange={(e) => handleFilterChange(e, "category")}
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
          onChange={(e) => handleFilterChange(e, "cuisine")}
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
          <span className="label-text">Plant-Based Level:</span>
        </label>
        <Select
          className="rounded border-1"
          defaultValue={"Any"}
          onChange={(e) => handleFilterChange(e, "plantBasedLevel")}
        >
          <Select.Option value="Any">Any</Select.Option>
          <Select.Option value="full">Fully Plant Based</Select.Option>
          <Select.Option value="partial">Partiallay Plant-Based</Select.Option>
        </Select>
      </div>
    </form>
  );
}
