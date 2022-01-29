import { useRouter } from "next/router";
import * as React from "react";

import { Link } from "../components/link";

export const djangoBaseUrl = process.env.NEXT_PUBLIC_DJANGO_BASE_URL ?? "";

const paramName = "auth-was-triggered-in-iframe";

const generateAuthRedirectTo = (): string => {
  const url = new URL(window.location.href);

  if (window !== window.parent) {
    url.searchParams.append(paramName, "true");
  }

  return url.toString().replace(url.origin, "");
};

export const IframeAwareLoginLink: React.VoidFunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const authLink = `/api/auth/login?redirectTo=${encodeURIComponent(
    generateAuthRedirectTo(),
  )}`;

  const handleClick = React.useCallback<React.MouseEventHandler>(
    (event) => {
      if (window !== window.parent) {
        parent.postMessage({ action: "navigate", href: authLink }, "*");
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

export const useGoToDjangoOnIframeAuth = (
  iframeContainerHref: string | undefined,
) => {
  const router = useRouter();

  React.useEffect(() => {
    const authWasTriggeredInIframe = router.query[paramName] === "true";
    if (
      !authWasTriggeredInIframe ||
      !djangoBaseUrl ||
      !iframeContainerHref ||
      !router.isReady
    ) {
      return;
    }
    void router.replace(djangoBaseUrl + iframeContainerHref);
  }, [iframeContainerHref, router, router.isReady, router.query]);
};
