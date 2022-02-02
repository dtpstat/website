import {
  getSession,
  HandleProfile,
  handleProfile,
  UserProfile,
} from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

import { createOrUpdateDbUser } from "../../../shared/user-helpers";

const handleMe: HandleProfile = async (req, res) => {
  const { user: userProfile } = getSession(req, res) as { user: UserProfile };

  const updatedUser = await createOrUpdateDbUser(userProfile);

  if (req.method === "GET") {
    res.status(200).json({ ...userProfile, user: updatedUser });
  } else {
    return handleProfile(req, res);
  }
};
export default withSentry(handleMe);
