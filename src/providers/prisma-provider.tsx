import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const getComments: GetStaticProps = async () => {
  const feed = await prisma.comments.findMany({});

  return { props: { feed } };
};
