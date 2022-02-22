import { withSentry } from "@sentry/nextjs";
import LRU from "lru-cache";
import { NextApiHandler } from "next";

import { djangoBaseUrl } from "../../../shared/django-helpers";

const pageCache = new LRU<string, string>({
  max: 100, // Setting upper cap to avoid accidental memory overflows
  maxAge: 1000 * 60 * 10, // 10 minutes
});

const transformHtmlByPathname: Record<string, (rawHtml: string) => string> = {
  "/opendata": (rawHtml) =>
    // Netlify is unable to proxy requests larger than 6 MB. We prefix all links
    // like /media/opendata/penzenskaia-oblast.geojson with Django base URL to avoid proxying.
    rawHtml.replace(
      /href="\/media\/opendata\//g,
      `href="${djangoBaseUrl}/media/opendata/`,
    ),
};

const hander: NextApiHandler = async (req, res) => {
  const upstreamUrl = new URL(req.url ?? "/", djangoBaseUrl);
  upstreamUrl.hash = "";
  upstreamUrl.search = "";

  const pathname = upstreamUrl.pathname;

  let html = pageCache.get(pathname);

  if (!html) {
    const response = await fetch(upstreamUrl.toString());
    const rawHtml = await response.text();

    const transformHtml = transformHtmlByPathname[pathname];
    html = transformHtml?.(rawHtml) ?? rawHtml;

    pageCache.set(pathname, html);
  }

  res.setHeader("content-type", "text/html; charset=utf-8");
  res.send(html);
};

export default withSentry(hander);
