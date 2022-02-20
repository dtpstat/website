import { NextPage } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import * as React from "react";

import { usePostLocationSearchChangesToIframeParent } from "../../shared/django-helpers";

const InheritedMap = dynamic(
  // eslint-disable-next-line unicorn/no-await-expression-member
  async () => (await import("../../components/inherited-map")).InheritedMap,
  { ssr: false },
);

const MapIframePage: NextPage = () => {
  usePostLocationSearchChangesToIframeParent();

  return (
    <>
      <Script
        src="https://api-maps.yandex.ru/2.1/?apikey=ad7c40a7-7096-43c9-b6e2-5e1f6d06b9ec&lang=ru_RU&coordorder=longlat"
        strategy="beforeInteractive"
      />
      <Script
        src="https://yastatic.net/s3/mapsapi-jslibs/heatmap/0.0.1/heatmap.min.js"
        strategy="beforeInteractive"
      />
      <InheritedMap />
    </>
  );
};

export default MapIframePage;
