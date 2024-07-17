import { Select } from "react-daisyui";

export default function SelectCuisineType({ setCuisineType, allCuisineOptions }: { setCuisineType: React.Dispatch<React.SetStateAction<string>>, allCuisineOptions: string[]}) {
  return (<div className="form control">
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
  </div>);
}