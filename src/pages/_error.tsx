import * as React from "react";

// @ts-expect-error -- temp code
const Error = ({ statusCode, err }) => {
  return (
    <div>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <code>{err}</code>
    </div>
  );
};

// @ts-expect-error -- temp code
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode, err: `${err} ${err.stack}` };
};

export default Error;
