import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Script from "next/script";
import * as React from "react";

const InheritedMap = dynamic(
  // eslint-disable-next-line unicorn/no-await-expression-member
  async () => (await import("../../components/inherited-map")).InheritedMap,
  { ssr: false },
);

const MapIframePage: NextPage = () => {
  const router = useRouter();
  const [search, setSearch] = React.useState<string | undefined>();
  const [parentOrigin, setParentOrigin] = React.useState<string | undefined>();

  // Initialize search and parentOrigin from ?parent-url=... + tweak window.location.search
  React.useEffect(() => {
    if (!router.isReady || typeof parentOrigin === "string") {
      return;
    }

    const initialPageUrl = new URL(window.location.href);
    const parentUrlParam = initialPageUrl.searchParams.get("parent-url");
    if (!parentUrlParam) {
      // eslint-disable-next-line no-console -- not expected in production setup
      console.warn(
        "Missing parent-url in iframe params. Messages to parent won’t be sent.",
      );
      setParentOrigin("");
      setSearch("");

      return;
    }

    try {
      const parentUrl = new URL(parentUrlParam);
      const parentSearch = parentUrl.search.replace(/^\?/, "");
      setParentOrigin(parentUrl.origin);
      setSearch(parentSearch);
      void router.replace(`/iframes/map?${parentSearch}`, undefined, {
        shallow: true, // Prevents page remount, which would re-trigger all effects
      });
    } catch {
      // eslint-disable-next-line no-console -- not expected in production setup
      console.warn(`Unable to parse ${parentUrlParam} as URL`);
      setParentOrigin("");
      setSearch("");
    }
  }, [router, router.isReady, parentOrigin]);

  // Track changes in window.location.search emitted by the map
  React.useEffect(() => {
    if (typeof parentOrigin !== "string") {
      return;
    }

    let oldSearch = window.location.search;
    const observer = new MutationObserver(() => {
      const newSearch = window.location.search;
      if (oldSearch !== newSearch) {
        oldSearch = newSearch;
        setSearch(newSearch);
      }
    });

    observer.observe(window.document.querySelector("body")!, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [parentOrigin]);

  // Post message to iframe parent
  React.useEffect(() => {
    if (typeof search !== "string") {
      return;
    }
    const message = { action: "replaceSearch", search };
    if (parentOrigin) {
      parent.postMessage(message, parentOrigin);
    } else {
      // eslint-disable-next-line no-console -- not expected in production setup
      console.info("Mock message to iframe parent", message);
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
