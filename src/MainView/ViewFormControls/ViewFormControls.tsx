import { useState, useEffect } from "react";
import { Select, Join } from "react-daisyui";
import { ILocation } from "../../interfaces";
import Search from './Search';
import SelectLocationType from './SelectLocationType';

export default function MapFormControls({
  restaurants,
  setViewingRestaurants,
  setMapView,
  mapView,
}: {
  restaurants: ILocation[] | [];
  setViewingRestaurants: React.Dispatch<React.SetStateAction<ILocation[] | []>>;
  setMapView: React.Dispatch<React.SetStateAction<boolean>>;
  mapView: boolean;
}) {
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
          : rest.menu.some((item: string) =>
              item.includes(completedKeyword.toLowerCase())
            );
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
      <Search setCompletedKeyword={setCompletedKeyword}/>
      <div className="flex gap-2">
        <SelectLocationType setLocationType={setLocationType} />
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
        <div className="form control">
          <label className="label">
            <span className="label-text">View as...</span>
          </label>
          <Join>
            <input
              className="join-item btn rounded"
              type="radio"
              name="Map Radio"
              aria-label="Map"
              checked={mapView}
              onChange={() => setMapView(true)}
            />
            <input
              className="join-item btn rounded"
              type="radio"
              name="List"
              aria-label="List"
              checked={!mapView}
              onChange={() => setMapView(false)}
            />
          </Join>
        </div>
      </div>
    </form>
  );
}
