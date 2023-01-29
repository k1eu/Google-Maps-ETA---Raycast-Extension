import { useEffect, useState } from "react";
import { LocalStorage } from "@raycast/api";

const DEFAULT_CURRENT_LOCATION = {
  lat: 40.714224,
  lng: -73.961452,
};

const DEFAULT_DESTINATION = {
  lat: 40.650002,
  lng: -73.949997,
};

export const useLocations = () => {
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_CURRENT_LOCATION);
  const [destination, setDestination] = useState(DEFAULT_DESTINATION);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const currentLocation = await LocalStorage.getItem<string>("currentLocation");
      const destination = await LocalStorage.getItem<string>("destination");
      if (currentLocation) {
        setCurrentLocation(JSON.parse(currentLocation));
      }
      if (destination) {
        setDestination(JSON.parse(destination));
      }
      setIsLoading(false);
    })();
  }, []);

  return {
    currentLocation,
    destination,
    isLoading,
  };
};
