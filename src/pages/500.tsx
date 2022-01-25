import { NextPage } from "next";
import Error from "next/error";
import * as React from "react";

const NotFoundPage: NextPage = () => {
  return <Error statusCode={500} />;
};

export default NotFoundPage;
