import { useState, useEffect } from 'react';
import './App.css'
import MainMap from './MainMap.tsx';

function App() {

  const [restaurants, setRestaurants] = useState<[{ lat: number, long: number, color: string, name: string }] | []>([]);
  useEffect(() => {
    async function getRestaurants() {
      try {
        const response = await fetch('/restaurants.json');
        if (!response.ok) throw new Error("Error in response");
        const json = await response.json();
        // remove when getting real data
        const restaurants = json.map((item: {name: string, lat: string | number, long: string | number, color: string}) => {
          item.lat = parseFloat(item.lat as string);
          item.long = parseFloat(item.long as string);
          return item;
        })
        setRestaurants(restaurants);
      } catch (error) {
        console.error('Failed to fetch restaurants: ' + error);
      }
    }

    getRestaurants();
  }, []);

  return (
    <>
     <MainMap restaurants={restaurants}/>
    </>
  )
}

export default App
