import { Stats } from 'react-daisyui';
import { ILocation } from '../../interfaces';
export default function LocationStats({ location }: { location: ILocation | null }) {
  if (location === null) return (<p>Error showing location stats.</p>);
  
  const { userRating, editorRating } = location;

  return ( <div className="flex flex-row justify-center items-center">
    <Stats className="font-sans text-primary-content rounded stats-horizontal">
      <Stats.Stat>
        <Stats.Stat.Item variant="title">Rating</Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{userRating}/5</Stats.Stat.Item>
        <Stats.Stat.Item
          variant="desc"
          className="whitespace-normal"
        >
          collected from GOPB users
        </Stats.Stat.Item>
      </Stats.Stat>
      <Stats.Stat>
        <Stats.Stat.Item variant="title">
          Editor Rating
        </Stats.Stat.Item>
        <Stats.Stat.Item variant="value">{editorRating}/5</Stats.Stat.Item>
        <Stats.Stat.Item
          variant="desc"
          className="whitespace-normal"
        >
          based on editor's personal experience
        </Stats.Stat.Item>
      </Stats.Stat>
    </Stats>
  </div>);
}