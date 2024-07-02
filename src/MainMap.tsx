import { Map, Marker, ZoomControl } from "pigeon-maps";

export default function MainMap({
  restaurants,
}: {
  restaurants:
    | [{ lat: number; long: number; color: string; name: string }]
    | [];
}) {
  return (
    <Map height={500} defaultCenter={[39.74, -104.99]} defaultZoom={12}>
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
