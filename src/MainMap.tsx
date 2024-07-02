import { useState } from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

export default function MainMap({
  restaurants,
}: {
  restaurants:
    | [{ lat: number; long: number; color: string; name: string }]
    | [];
}) {
  const [center, setCenter] = useState<[number, number]>([39.74, -104.99]);
  const [zoom, setZoom] = useState(12);

  return (
    <Map height={500} defaultCenter={center} defaultZoom={zoom}>
      <ZoomControl />
      {restaurants.map(({name, lat, long, color}) => {
        console.log(name, lat, long)
        return (
          <Marker
            key={name}
            width={50}
            anchor={[lat, long]}
            color={color}
            onClick={() => console.log("hi!", name)}
          />
        );
      })}
    </Map>
  );
}
