/*
 * This file contains workarounds needed for a smooth transition from Django to Next.js.
 * The main focus of the file is iframe messaging and iframe-aware auth flows.
 *
 * When deleting this file, remember to also delete /public/iframes/.
 */

import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import Script from "next/script";
import * as React from "react";

import { Link } from "../components/link";

export const djangoBaseUrl = process.env.NEXT_PUBLIC_DJANGO_BASE_URL ?? "";
export const djangoContentFallback =
  process.env.NEXT_PUBLIC_DJANGO_CONTENT_FALLBACK === "true";

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

/**
 * This flag enables iframe-aware auth flow. The flow requires:
 * - <IframeAwareLoginLink />
 * - <DjangoRedirectOnIframeAuth />
 *
 * When this app is not in an iframe, the flag is not used:
 *
 * 1. user clicks a login link on {next.js}/some-url
 * 2. current page navigates to {next.js}/api/auth/login?returnTo=/some-url
 * 3. user completes Auth0 form
 * 4. user lands on {next.js}/some-url
 *
 * When this app is in an iframe, the flag is used:
 *
 * 1. user clicks a login link on {next.js}/some-url (iframe URL)
 * 2. iframe sends message to parent window asking to navigate to {next.js}/api/auth/login?returnTo=/some-url&{flag}=true
 * 3. parent window (Django) navigates to {next.js}/api/auth/login?returnTo=/some-url&{flag}=true
 * 4. user completes Auth0 form
 * 5. user lands on {next.js}/some-url&{flag}=true in the parent window
 * 6. <DjangoRedirectOnIframeAuth /> detects {flag} and redirects parent window to a corresponding Django page
 * 7. user sees {next.js}/some-url as part of the corresponding Django page
 */
const specialIframeFlagInAuthUrls = "iframe-auth";

const generateAuthReturnTo = (): string => {
  const url = new URL(window.location.href);

  if (window !== window.parent) {
    url.searchParams.append(specialIframeFlagInAuthUrls, "true");
  }

  return url.toString().replace(url.origin, "");
};

/**
 * Part of iframe-aware auth flow
 */
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
    <Link href={authLink} onClick={handleClick}>
      {children}
    </Link>
  );
};

/**
 * Part of iframe-aware auth flow
 */
export const DjangoRedirectOnIframeAuth: React.VoidFunctionComponent<{
  children?: React.ReactNode;
  djangoPageHref: string | undefined;
}> = ({ children, djangoPageHref }) => {
  const router = useRouter();
  const { isLoading: userIsLoading } = useUser();
  const [readyToRenderChildren, setReadyToRenderChildren] =
    React.useState(false);

  React.useEffect(() => {
    if (!router.isReady) {
      return;
    }
    const authWasTriggeredInIframe =
      router.query[specialIframeFlagInAuthUrls] === "true";

    if (!authWasTriggeredInIframe || !djangoBaseUrl || !djangoPageHref) {
      setReadyToRenderChildren(true);

      return;
    }

    if (userIsLoading) {
      return;
    }

    void router.replace(`${djangoBaseUrl}${djangoPageHref}`);
  }, [djangoPageHref, router, router.isReady, router.query, userIsLoading]);

  return <>{readyToRenderChildren ? children : undefined}</>;
};

/**
 * Enables iframe resizing based on content height.
 * Used in iframe with comments.
 *
 * @see https://github.com/davidjbradshaw/iframe-resizer
 */
export const IframeResizerScript: React.VoidFunctionComponent = () => {
  return (
    <Script
      src="/iframes/iframe-resizer.content-window.min.js"
      strategy="afterInteractive"
    />
  );
};

/**
 * Helps replace ?search in the parent window when iframe search params are updated.
 * Used in iframe with map.
 */
export const usePostLocationSearchChangesToIframeParent = (): void => {
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
