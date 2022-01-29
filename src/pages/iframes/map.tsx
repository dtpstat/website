import { NextPage } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import * as React from "react";

const InheritedMap = dynamic(
  // eslint-disable-next-line unicorn/no-await-expression-member
  async () => (await import("../../components/inherited-map")).InheritedMap,
  { ssr: false },
);

const postMessageToParent = (message: unknown) => {
  if (window !== window.parent) {
    parent.postMessage(message, "*");
  } else {
    // eslint-disable-next-line no-console -- not expected in production setup
    console.info("Mock message to iframe parent", message);
  }
};

const MapIframePage: NextPage = () => {
  // Track changes in window.location.search emitted by the map
  React.useEffect(() => {
    let previousSearch = window.location.search;
    const observer = new MutationObserver(() => {
      const search = window.location.search;
      if (previousSearch !== search) {
        previousSearch = search;
        postMessageToParent({ action: "replaceSearch", search });
      }
    });

    observer.observe(window.document.querySelector("body")!, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
      <InheritedMap />
    </>
  );
};

export default MapIframePage;
