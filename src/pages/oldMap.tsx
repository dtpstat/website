// import { Map } from "../components/OldMap";
import dynamic from "next/dynamic";
import Script from "next/script";
import * as React from "react";

const DynamicOldMap = dynamic(
  () => import("../components/inherited/dtp-map/src/App"),
  {
    ssr: false,
  },
);

export default function Home() {
  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ad7c40a7-7096-43c9-b6e2-5e1f6d06b9ec&lang=ru_RU"
        strategy="beforeInteractive"
      />
      <Script
        src="https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js"
        strategy="beforeInteractive"
      />
      <DynamicOldMap />
    </>
  );
}
