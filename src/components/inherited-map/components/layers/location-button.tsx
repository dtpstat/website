import { observer } from "mobx-react";
import * as React from "react";
import sleep from "sleep-promise";

import { useStore } from "../../models/root-store";
import { SvgIcon } from "../svg-icon";

export interface LocationButtonProps {
  children?: React.ReactNode;
}

export const LocationButton = observer<
  React.VoidFunctionComponent<LocationButtonProps>
>(() => {
  const { mapStore } = useStore();
  const map = mapStore.getMap();

  const [status, setStatus] = React.useState<"idle" | "loading" | "error">(
    "idle",
  );

  const handleClick = React.useCallback(async () => {
    setStatus("loading");
    try {
      // @ts-expect-error -- geolocation is not included into Yandex Maps typings
      const result = await window.ymaps.geolocation.get({
        mapStateAutoApply: true,
      });
      await map?.panTo(result.geoObjects.position);
      setStatus("idle");
    } catch {
      setStatus("error");
      await sleep(1000);
      setStatus("idle");
    }
  }, [map]);

  if (!mapStore.mapReady) {
    return <></>;
  }

  return (
    <button
      className={`btn-location btn-location-${status}`}
      disabled={status !== "idle"}
      aria-label="Мое местоположение"
      onClick={handleClick}
    >
      <SvgIcon name="location-arrow" />
    </button>
  );
});
