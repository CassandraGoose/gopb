import { useState, useEffect } from "react";
import { Input, Select, Button } from "react-daisyui";
import { ILocation } from "../interfaces";

export default function MapFormControls({
  restaurants,
  setViewingRestaurants,
}: {
  restaurants: ILocation[] | [];
  setViewingRestaurants: React.Dispatch<React.SetStateAction<ILocation[] | []>>;
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [completedKeyword, setCompletedKeyword] = useState("");
  const [locationType, setLocationType] = useState("Any");
  const [cuisineType, setCuisineType] = useState("Any");
  const [plantBasedLevel, setPlantBasedLevel] = useState("Any");

  const allCuisineOptions = Array.from(
    new Set(restaurants.map((rest) => rest.cuisine).flat())
  );
  allCuisineOptions.unshift("Any");

  useEffect(() => {
    const updatedRestaurants = restaurants.filter((rest) => {
      const searchOptions =
        completedKeyword === ""
          ? true
          : rest.menu.includes(completedKeyword.toLowerCase());
      const locationOptions =
        locationType === "Any" ? true : rest.category.includes(locationType);
      const cuisineOptions =
        cuisineType === "Any" ? true : rest.cuisine.includes(cuisineType);
      const plantBasedOptions =
        plantBasedLevel === "Any"
          ? true
          : rest.plantBasedLevel === plantBasedLevel;
      return (
        searchOptions && locationOptions && cuisineOptions && plantBasedOptions
      );
    });
    setViewingRestaurants(updatedRestaurants);
  }, [
    completedKeyword,
    locationType,
    cuisineType,
    plantBasedLevel,
    restaurants,
    setViewingRestaurants,
  ]);

  return (
    <form className="flex w-full component-preview pb-2 items-center justify-between gap-2">
      <div className="form-control flex flex-row items-end justify-center gap-2">
        <div className="flex flex-col">
          <label className="label">
            <span className="label-text">Search by keyword, food, etc:</span>
          </label>
          <Input
            type="search"
            className="rounded"
            placeholder="Search..."
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <Button
          className="rounded"
          onClick={(e) => {
            e.preventDefault();
            setCompletedKeyword(searchKeyword);
          }}
        >
          Search
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="form control">
          <label className="label">
            <span className="label-text">Location Type:</span>
          </label>
          <Select
            className="rounded border-1"
            defaultValue={"Any"}
            onChange={(e) => setLocationType(e.target.value)}
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
            onChange={(e) => setCuisineType(e.target.value)}
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
            onChange={(e) => setPlantBasedLevel(e.target.value)}
          >
            <Select.Option value="Any">Any</Select.Option>
            <Select.Option value="full">Fully Plant Based</Select.Option>
            <Select.Option value="partial">
              Partiallay Plant-Based
            </Select.Option>
          </Select>
        </div>
      </div>
    </form>
  );
}
