import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import Script from "next/script";
import * as React from "react";
import { createGlobalStyle } from "styled-components";

import { CommentInput } from "../../components/comment-input";
import { CommentList } from "../../components/comment-list";
import { AccidentProvider } from "../../providers/accident-provider";
import { CommentsProvider } from "../../providers/comments-provider";
import { commentsArePaused } from "../../shared/comment-helpers";

const IframeResizerScript: React.VoidFunctionComponent = () => {
  return (
    <Script
      src="/iframes/iframe-resizer.content-window.min.js"
      strategy="afterInteractive"
    />
  );
};

// Globally set height: 100%; makes resizing a noop
const HtmlHeightOverride = createGlobalStyle`
  html {
    height: auto;
  }
`;

const CommentsIframePage: NextPage = () => {
  const {
    query: { "accident-id": accidentId },
    isReady: routerIsReady,
  } = useRouter();

  // Prevent tree mismatch between server and client on initial render
  const [client, setClient] = React.useState(false);
  React.useEffect(() => {
    setClient(true);
  }, []);

  if (!client || !routerIsReady) {
    return (
      <>
        <HtmlHeightOverride />
        <IframeResizerScript />
      </>
    );
  }

  if (typeof accidentId !== "string" || !accidentId) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <HtmlHeightOverride />
      <IframeResizerScript />
      <AccidentProvider initAccidentId={accidentId}>
        <CommentsProvider>
          <CommentList />
          {commentsArePaused ? (
            <p>Добавление новых комментариев приостановлено</p>
          ) : (
            <CommentInput />
          )}
        </CommentsProvider>
      </AccidentProvider>
    </>
  );
};

export default CommentsIframePage;
