import { getPreferenceValues, showHUD } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { Preferences } from "../constants";
import { useLocations } from "../useLocations";

type DirectionsResponse = {
  routes: {
    legs: {
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
      end_address: string;
      end_location: {
        lat: number;
        lng: number;
      };
      start_address: string;
      start_location: {
        lat: number;
        lng: number;
      };
    }[];
  }[];
};

export function useDirections() {
  const { apiKey } = getPreferenceValues<Preferences>();
  const { currentLocation: from, destination: to, isLoading: isLoadingLocations } = useLocations();

  return useFetch<DirectionsResponse>(
    `https://maps.googleapis.com/maps/api/directions/json?units=imperial&origin=${from.lat},${from.lng}&destination=${to.lat},${to.lng}&key=${apiKey}`,
    {
      keepPreviousData: true,
      execute: !isLoadingLocations,
      onError: (error) => {
        showHUD(error.message);
      },
    }
  );
}
