import { User } from "@prisma/client";
import { NextApiHandler } from "next";

import { getUser, updateUser } from "../../../services/user";

const handler: NextApiHandler = async (req, res) => {
  const userId = req.query["user-id"] as string;

  if (req.method === "PATCH" && userId) {
    const user = await updateUser(
      userId,
      JSON.parse(req.body as string) as User,
    );
    res.status(200).json({ user });
  } else if (req.method === "GET" && userId) {
    res.status(200).json({ user: await getUser(userId) });
  }
};

export default handler;
