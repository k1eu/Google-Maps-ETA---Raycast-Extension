import { getPreferenceValues } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { Preferences } from "../constants";
import { useLocations } from "../useLocations";

type DistanceResponse = {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: {
    elements: {
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
      status: string;
    }[];
  }[];
};

function useDistance() {
  const { apiKey } = getPreferenceValues<Preferences>();
  const { currentLocation: from, destination: to, isLoading: isLoadingLocations } = useLocations();

  return useFetch<DistanceResponse>(
    `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${from.lat},${from.lng}&destinations=${to.lat},${to.lng}&key=${apiKey}`,
    {
      keepPreviousData: true,
      execute: !isLoadingLocations,
    }
  );
}
export default useDistance;
