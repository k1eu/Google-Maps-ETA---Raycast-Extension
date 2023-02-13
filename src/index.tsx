import { Icon, MenuBarExtra } from "@raycast/api";
import { getFavicon } from "@raycast/utils";
import { useDirections } from "./api/useDirections";

export default function Command() {
  const { data, isLoading, revalidate } = useDirections();

  const eta = data?.routes[0]?.legs[0]?.duration?.text || "Error";

  return (
    <MenuBarExtra icon={Icon.Bookmark} title={`ETA To Home: ${eta}`} isLoading={isLoading}>
      <MenuBarExtra.Item title="Options" />
      <MenuBarExtra.Item
        icon={getFavicon("https://www.google.com/maps")}
        title={"Refresh"}
        onAction={() => revalidate()}
      />
    </MenuBarExtra>
  );
}
