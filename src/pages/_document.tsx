import Document, { DocumentContext } from "next/document";
import * as React from "react";
import { ServerStyleSheet } from "styled-components";

// Source: https://github.com/vercel/next.js/blob/ac82da22506e0dad731a1a47956f75ef370b75e3/examples/with-styled-components/pages/_document.js

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    // eslint-disable-next-line testing-library/render-result-naming-convention
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
