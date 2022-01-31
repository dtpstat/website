import {
  getSession,
  HandleProfile,
  handleProfile,
  UserProfile,
} from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

import {
  createOrUpdateDbUser,
  userProfileToUser,
} from "../../../shared/user-helpers";

const handleMe: HandleProfile = async (req, res) => {
  const { user: auth0User } = getSession(req, res) as { user: UserProfile };

  const userData = userProfileToUser(auth0User);
  const userId = auth0User.sub as string;
  const updatedUser = await createOrUpdateDbUser(userId, userData);

  if (req.method === "GET") {
    res.status(200).json({ ...auth0User, user: updatedUser });
  } else {
    return handleProfile(req, res);
  }
};
export default withSentry(handleMe);
