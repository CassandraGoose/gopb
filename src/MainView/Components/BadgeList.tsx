import { Badge } from "react-daisyui";

export default function cuisineBadges({ items, locationName }: { items: string[], locationName: string}) {
  return (
    <div className="text-sm text-gray-500 space-x-1 space-y-2">
      {items.map((item) => {
        return (
          <Badge key={item + locationName} color="accent">
            {item}
          </Badge>
        );
      })}
    </div>
  );
}
