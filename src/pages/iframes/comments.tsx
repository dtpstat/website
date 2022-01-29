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
  IframeResizerScript,
  useGoToDjangoOnIframeAuth,
} from "../../shared/django-migration";

// Keeping "height: 100%" from src/styles/inherited-scss/helpers/_base.scss
// would invalidate iframe resizing
const HtmlHeightOverride = createGlobalStyle`
  html {
    height: auto;
  }
`;

const CommentsIframePage: NextPage = () => {
  const router = useRouter();
  const accidentId =
    typeof router.query["accident-id"] === "string"
      ? router.query["accident-id"]
      : undefined;

  useGoToDjangoOnIframeAuth(
    typeof accidentId === "string" ? `/dtp/${accidentId}/` : undefined,
  );

  // Prevent tree mismatch between server and client on initial render
  const [client, setClient] = React.useState(false);
  React.useEffect(() => {
    setClient(true);
  }, []);

  if (!client || !router.isReady) {
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
