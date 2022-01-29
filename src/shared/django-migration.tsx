import { useRouter } from "next/router";
import Script from "next/script";
import * as React from "react";

import { Link } from "../components/link";
import { useUser } from "../providers/user-profile-provider";

export const djangoBaseUrl = process.env.NEXT_PUBLIC_DJANGO_BASE_URL ?? "";

const paramName = "auth-was-triggered-in-iframe";

const postMessageToIframeParent = (message: unknown): boolean => {
  if (window !== window.parent) {
    parent.postMessage(message, "*");

    return true;
  } else {
    // eslint-disable-next-line no-console -- not expected in production setup
    console.info("Mock message to iframe parent", message);

    return false;
  }
};

const generateAuthReturnTo = (): string => {
  const url = new URL(window.location.href);

  if (window !== window.parent) {
    url.searchParams.append(paramName, "true");
  }

  return url.toString().replace(url.origin, "");
};

export const IframeAwareLoginLink: React.VoidFunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const authLink = `${
    window.location.origin
  }/api/auth/login?returnTo=${encodeURIComponent(generateAuthReturnTo())}`;

  const handleClick = React.useCallback<React.MouseEventHandler>(
    (event) => {
      if (postMessageToIframeParent({ action: "navigate", href: authLink })) {
        event.preventDefault();
      }
    },
    [authLink],
  );

  return (
    <Link href={authLink}>
      <a onClick={handleClick}>{children}</a>
    </Link>
  );
};

export const GoToDjangoOnIframeAuth: React.VoidFunctionComponent<{
  children?: React.ReactNode;
  djangoPageHref: string | undefined;
}> = ({ children, djangoPageHref }) => {
  const router = useRouter();

  const { isLoading } = useUser();

  React.useEffect(() => {
    const authWasTriggeredInIframe = router.query[paramName] === "true";
    if (
      !authWasTriggeredInIframe ||
      !djangoBaseUrl ||
      !djangoPageHref ||
      !router.isReady
    ) {
      return;
    }
    void router.replace(djangoBaseUrl + djangoPageHref);
  }, [djangoPageHref, router, router.isReady, router.query]);

  return <>{isLoading ? undefined : children}</>;
};

export const IframeResizerScript: React.VoidFunctionComponent = () => {
  return (
    <Script
      src="/iframes/iframe-resizer.content-window.min.js"
      strategy="afterInteractive"
    />
  );
};

export const useReportChangesInWindowLocationSearch = (): void => {
  React.useEffect(() => {
    let previousSearch = window.location.search;
    const observer = new MutationObserver(() => {
      const search = window.location.search;
      if (previousSearch !== search) {
        previousSearch = search;
        postMessageToIframeParent({ action: "replaceSearch", search });
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
};
