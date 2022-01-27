import { NextPage } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import * as React from "react";

const InheritedMap = dynamic(
  // eslint-disable-next-line unicorn/no-await-expression-member
  async () => (await import("../../components/inherited-map")).InheritedMap,
  { ssr: false },
);

const MapIframePage: NextPage = () => {
  const [search, setSearch] = React.useState<string | undefined>();
  const [parentOrigin, setParentOrigin] = React.useState<string | undefined>();

  React.useEffect(() => {
    const initialPageUrl = new URL(window.location.href);
    const parentUrlParam = initialPageUrl.searchParams.get("parent-url");
    if (!parentUrlParam) {
      // eslint-disable-next-line no-console
      console.warn(
        "Missing parent-url in iframe params. Messages to parent won’t be sent.",
      );
      setSearch("");

      return;
    }

    try {
      const parentUrl = new URL(parentUrlParam);
      setSearch(parentUrl.search.replace(/^\?/, ""));
      setParentOrigin(parentUrl.origin);
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`Unable to parse ${parentUrlParam} as URL`);
      setSearch("");
    }
  }, []);

  React.useEffect(() => {
    if (!parentOrigin) {
      return;
    }
    const interval = setInterval(() => {
      setSearch(window.location.search);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [parentOrigin]);

  React.useEffect(() => {
    if (parentOrigin && typeof search === "string") {
      parent.postMessage({ action: "replaceSearch", search }, parentOrigin);
    }
  }, [search, parentOrigin]);

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
      {typeof search === "string" ? <InheritedMap /> : undefined}
    </>
  );
};

export default MapIframePage;
