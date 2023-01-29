import { Action, ActionPanel, Detail, Form, LocalStorage, useNavigation } from "@raycast/api";
import { useLocationFromAddress } from "./api/useLocationFromAdress";

type FormValues = {
  currentLocatoin: string;
  destination: string;
};

export default function Command() {
  const { push } = useNavigation();

  const handleSubmit = (values: FormValues) => {
    push(<Details locations={values} />);
  };

  const handleClear = () => {
    LocalStorage.removeItem("currentLocation");
    LocalStorage.removeItem("destination");
  };

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} />
          <Action title="Clear Locations" onAction={handleClear} />
        </ActionPanel>
      }
    >
      <Form.TextField id="currentLocatoin" title="Current Location" placeholder="Enter your current address" />
      <Form.TextField id="destination" title="Destination" placeholder="" />
    </Form>
  );
}

const convertSpacesToPlus = (address: string) => {
  return address.replace(/ /g, "+");
};

function Details({ locations }: { locations: FormValues }) {
  const currentLocation = convertSpacesToPlus(locations.currentLocatoin);
  const destination = convertSpacesToPlus(locations.destination);

  const { data: currentLocationData, isLoading: isLoadingCurrData } = useLocationFromAddress(currentLocation);
  const { data: destinationData, isLoading: isLoadingDestination } = useLocationFromAddress(destination);

  const currentLocationCoordinates = currentLocationData?.results[0].geometry.location;
  const destinationCoordinates = destinationData?.results[0].geometry.location;

  const markdown = `
  # Hello World
  ## Current Location ${JSON.stringify(currentLocationCoordinates)}
  ## Destination ${JSON.stringify(destinationCoordinates)}`;

  const isLoading = isLoadingCurrData || isLoadingDestination;

  const handleSave = () => {
    LocalStorage.setItem("currentLocation", JSON.stringify(currentLocationCoordinates));
    LocalStorage.setItem("destination", JSON.stringify(destinationCoordinates));
  };

  return (
    <Detail
      markdown={markdown}
      isLoading={isLoading}
      actions={
        <ActionPanel>
          <Action title="Save Locations" onAction={handleSave} />
        </ActionPanel>
      }
    />
  );
}
