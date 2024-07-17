import { Select } from "react-daisyui";

export default function SelectPBLevel({
  setPlantBasedLevel,
}: {
  setPlantBasedLevel: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
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
        <Select.Option value="partial">Partiallay Plant-Based</Select.Option>
      </Select>
    </div>
  );
}
