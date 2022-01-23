// Component logic is inspired by
// https://github.com/vercel/next.js/blob/01cd69fbc355af6bd2bbc330bc66c8b36009121f/examples/with-sentry/pages/_error.js

import * as Sentry from "@sentry/nextjs";
import { NextPage } from "next";
import NextErrorComponent, { ErrorProps as NextErrorProps } from "next/error";
import * as React from "react";

interface ErrorProps extends NextErrorProps {
  hasGetInitialPropsRun: boolean;
  err?: Error;
}

const ErrorPage: NextPage<ErrorProps> = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

ErrorPage.getInitialProps = async (context) => {
  const errorInitialProps = (await NextErrorComponent.getInitialProps(
    context,
  )) as ErrorProps;

  const { res, err, asPath } = context;

  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return errorInitialProps;
  }

  if (err) {
    Sentry.captureException(err);
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(
      `_error.js getInitialProps missing data at path: ${asPath ?? "[?]"}`,
    ),
  );
  await Sentry.flush(2000);

  return errorInitialProps;
};

export default ErrorPage;
