import { Icon, MenuBarExtra } from "@raycast/api";
import { getFavicon } from "@raycast/utils";
import useDistance from "./api/useDistance";

export default function Command() {
  const { data, isLoading, revalidate } = useDistance();

  const eta = data?.rows[0].elements[0].duration.text;

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
