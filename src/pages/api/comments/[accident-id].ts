import { NextApiHandler } from "next";

import { createComment, getComments } from "../../../services/comment";
import { getApiParamNumberValue } from "../../../shared/api-helpers";
import { NewComment } from "../../../types";

const handler: NextApiHandler = async (req, res) => {
  const accidentId = getApiParamNumberValue(req.query["accident-id"] as string);

  if (req.method === "POST" && accidentId) {
    const comment = await createComment(
      accidentId,
      JSON.parse(req.body as string) as NewComment,
    );
    res.status(200).json({ comment });
  } else if (req.method === "GET" && accidentId) {
    res.status(200).json({ comments: await getComments(accidentId) });
  }
};

export default handler;
