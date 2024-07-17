import { Select } from "react-daisyui";

export default function SelectLocationType({ setLocationType }: { setLocationType: React.Dispatch<React.SetStateAction<string>>}) {
  return (<div className="form control">
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
  </div>);
}