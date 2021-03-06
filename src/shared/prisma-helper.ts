import { PrismaClient } from "@prisma/client";

// In development, `next dev` command clears Node.js cache on run. This in turn initializes
// a new PrismaClient instance each time due to hot reloading that creates a connection
// to the database. This can quickly exhaust the database connections as each PrismaClient
// instance holds its own connection pool. Code below fixes this limitation.
//
// Source: https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
// Permalink: https://github.com/prisma/docs/blob/0d887062857855c1225a0b953b608f6fea776e62/content/500-support/100-help-articles/400-nextjs-prisma-client-dev-practices.mdx

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
