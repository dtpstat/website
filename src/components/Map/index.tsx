import Script from "next/script";
import React, { useEffect, useRef, useState } from "react";
import { YMaps } from "react-yandex-maps";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectMapState } from "../../store/slices/mapStateSlice";
import { getRegionData, selectRegion } from "../../store/slices/regionSlice";
import { heatmapConfig } from "./config";
import { data } from "./data";
import { MapView } from "./MapView";

export const Map = () => {
  const dispatch = useAppDispatch();
  const { region, pendingRegion, regionFetchErrored } =
    useAppSelector(selectRegion);
  const mapState = useAppSelector(selectMapState);
  const [heatmap, setHeatmap] = useState(null);
  const [heatmapLoaded, setHeatmapLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    dispatch(getRegionData(mapState));
  }, [mapState, dispatch]);

  useEffect(() => {
    if (!pendingRegion && !regionFetchErrored) {
      // console.log('region', region)
    }
  }, [region, pendingRegion, regionFetchErrored]);

  useEffect(() => {
    if (heatmapLoaded && !heatmap) {
      window.ymaps.ready(["Heatmap"]).then(() => {
        const hmdata = [];
        for (let i = 0; i < data.length; i++) {
          hmdata.push([
            data[i].Cells.geoData.coordinates[1],
            data[i].Cells.geoData.coordinates[0],
          ]);
        }
        setHeatmap(new window.ymaps.Heatmap(hmdata, heatmapConfig));
      });
    }
  }, [heatmapLoaded, heatmap]);

  // useEffect(() => {
  //   if (mapRef.current !== null) {
  //       console.log("mapRef.current.offsetHeight", mapRef.current);
  //   }
  // }, [mapRef.current])

  return (
    <>
      <Script
        id="ymaps-heatmap"
        src="https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          setHeatmapLoaded(true);
        }}
      />
      <YMaps>
        <MapView
          {...{
            mapRef,
            mapState,
            heatmap,
          }}
        />
      </YMaps>
    </>
  );
};
