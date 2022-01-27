import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

const MapIframePage: NextPage = () => {
  const [search, setSearch] = React.useState<string | undefined>();
  const [parentOrigin, setParentOrigin] = React.useState<string | undefined>();
  const router = useRouter();

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
      const x = new URL(parentUrlParam);
      setSearch(x.search.replace(/^\?/, ""));
      setParentOrigin(x.origin);
    } catch {
      // eslint-disable-next-line no-console
      console.warn(`Unable to parse ${parentUrlParam} as URL`);
      setSearch("");
    }
  }, []);

  React.useEffect(() => {
    if (parentOrigin && typeof search === "string") {
      parent.postMessage({ action: "replaceSearch", search }, parentOrigin);
    }
  }, [search, parentOrigin]);

  const navigate = React.useCallback(
    (href: string) => {
      if (parentOrigin) {
        parent.postMessage({ action: "navigate", href }, parentOrigin);
      } else {
        void router.push(href);
      }
    },
    [parentOrigin, router],
  );

  if (typeof search === "undefined") {
    return <></>;
  }

  return (
    <div
      style={{
        border: "3px solid red",
        position: "absolute",
        padding: 10,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
    >
      <h1>В этом айфреме будет карта</h1>
      Параметры страницы-контейнера: {search}
      <br />
      <button
        onClick={() => {
          setSearch(`time=${Date.now()}`);
        }}
      >
        поменять
      </button>
      <br />
      <br />
      Навигация страницы-контейнера:
      <ul>
        {["/pages/about/", "/donate/"].map((href) => (
          <li key={href}>
            <a
              href={href}
              onClick={(event) => {
                navigate(href);
                event.preventDefault();
              }}
            >
              {href}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MapIframePage;
