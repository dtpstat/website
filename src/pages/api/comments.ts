import { NextApiHandler } from "next";

import { createComment, getComments } from "../../services/comment";
import { NewComment } from "../../types";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const comment = await createComment(
      JSON.parse(req.body as string) as NewComment,
    );
    res.status(200).json({ comment });
  } else {
    res.status(200).json({ comments: await getComments() });
  }
};

export default handler;
