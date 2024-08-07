import { useState, useEffect } from "react";
import { ILocation } from "../../interfaces";
import Search from "./Search";
import SelectLocationType from "./SelectLocationType";
import SelectCuisineType from "./SelectCuisineType";
import SelectPBLevel from "./SelectPBLevel";
import MapListViewRadio from "./MapListViewRadio";

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
      <Search setCompletedKeyword={setCompletedKeyword} />
      <div className="flex gap-2">
        <SelectLocationType setLocationType={setLocationType} />
        <SelectCuisineType
          setCuisineType={setCuisineType}
          allCuisineOptions={allCuisineOptions}
        />
        <SelectPBLevel setPlantBasedLevel={setPlantBasedLevel} />
        <MapListViewRadio setMapView={setMapView} mapView={mapView} />
      </div>
    </form>
  );
}
