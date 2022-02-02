import { NextPage } from "next";
import Error from "next/error";
import { useRouter } from "next/router";
import * as React from "react";
import { createGlobalStyle } from "styled-components";

import { CommentInput } from "../../components/comment-input";
import { CommentList } from "../../components/comment-list";
import { AccidentProvider } from "../../providers/accident-provider";
import { CommentsProvider } from "../../providers/comments-provider";
import { commentsArePaused } from "../../shared/comment-helpers";
import {
  DjangoRedirectOnIframeAuth,
  IframeResizerScript,
} from "../../shared/django-helpers";

// Keeping "height: 100%" from src/styles/inherited-scss/helpers/_base.scss
// would invalidate iframe resizing
// @todo: update global styles and remove
const GlobalStyleOverride = createGlobalStyle`
  html, body {
    // Keeping height: 100% from src/styles/inherited-scss/helpers/_base.scss
    // would invalidate iframe resizing
    height: auto;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }
`;

const CommentsIframePage: NextPage = () => {
  const router = useRouter();
  const accidentId =
    typeof router.query["accident-id"] === "string"
      ? router.query["accident-id"]
      : undefined;

  // Prevent tree mismatch between server and client on initial render
  const [ssr, setSsr] = React.useState(true);
  React.useEffect(() => {
    setSsr(false);
  }, []);

  if (ssr || !router.isReady) {
    return (
      <>
        <GlobalStyleOverride />
        <IframeResizerScript />
      </>
    );
  }

  if (typeof accidentId !== "string" || !accidentId) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <GlobalStyleOverride />
      <IframeResizerScript />
      <DjangoRedirectOnIframeAuth
        djangoPageHref={
          typeof accidentId === "string"
            ? `/dtp/${accidentId}/#comments`
            : undefined
        }
      >
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
      </DjangoRedirectOnIframeAuth>
    </>
  );
};

export default CommentsIframePage;
