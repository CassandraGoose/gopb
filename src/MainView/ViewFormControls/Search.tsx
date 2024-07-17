import { useState } from "react";
import { Input, Button } from "react-daisyui";

export default function Search({ setCompletedKeyword }: { setCompletedKeyword: React.Dispatch<React.SetStateAction<string>>}) {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (<div className="form-control flex flex-row items-end justify-center gap-2">
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
  </div>);
}