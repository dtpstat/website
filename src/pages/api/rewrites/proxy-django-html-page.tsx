import { withSentry } from "@sentry/nextjs";
import LRU from "lru-cache";
import { NextApiHandler } from "next";

import { getDjangoBaseUrl } from "../../../shared/django-helpers"; // Изменено на getDjangoBaseUrl

const pageCache = new LRU<string, string>({
  max: 100,
  maxAge: 1000 * 60 * 10,
});

const transformHtmlByPathname: Record<string, (rawHtml: string) => string> = {
  "/opendata": (rawHtml) =>
    rawHtml.replace(
      /href="\/media\/opendata\//g,
      `href="${getDjangoBaseUrl({ headers: { host: '', protocol: '' } })}/media/opendata/`, // Используем getDjangoBaseUrl
    ),
};

const handler: NextApiHandler = async (req, res) => {
  const upstreamUrl = new URL(req.url ?? "/", getDjangoBaseUrl(req)); // Используем getDjangoBaseUrl
  upstreamUrl.hash = "";
  upstreamUrl.search = "";

  const pathname = upstreamUrl.pathname;

  if (pathname === "/api/rewrites/proxy-django-html-page") {
    res.status(404).send("404 Not found");
    return;
  }

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

export default withSentry(handler);
