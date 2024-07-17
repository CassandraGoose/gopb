import { Join } from "react-daisyui";

export default function MapListViewRadio({ setMapView, mapView }: { setMapView: React.Dispatch<React.SetStateAction<boolean>>, mapView: boolean}) {
  return (<div className="form control">
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
  </div>);
}