import { getPreferenceValues } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import type { Preferences } from "../constants";

type LocationResponse = {
  "results": {
    "address_components": {
      "long_name": string;
      "short_name": string;
      "types": string[];
    }[];
    "formatted_address": string;
    "geometry": {
      "bounds": {
        "northeast": {
          "lat": number;
          "lng": number;
        };
        "southwest": {
          "lat": number;
          "lng": number;
        };
      };
      "location": {
        "lat": number;
        "lng": number;
      };
      "location_type": string;
      "viewport": {
        "northeast": {
          "lat": number;
          "lng": number;
        };
        "southwest": {
          "lat": number;
          "lng": number;
        };
      };
    };
    "place_id": string;
    "plus_code": {
      "compound_code": string;
      "global_code": string;
    };
    "types": string[];
  }[];
  "status": string;
}

export function useLocationFromAddress(address: string) {
  const { apiKey } = getPreferenceValues<Preferences>();

  return useFetch<LocationResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`);
}

