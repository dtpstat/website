import {
  getSession,
  HandleProfile,
  handleProfile as auth0HandleProfile,
  UserProfile,
} from "@auth0/nextjs-auth0";
import { withSentry } from "@sentry/nextjs";

import {
  createOrUpdateDbUser,
  userProfileToUser,
} from "../../shared/user-helpers";

const handleProfile: HandleProfile = async (req, res) => {
  const { user: auth0User } = getSession(req, res) as { user: UserProfile };

  const userData = userProfileToUser(auth0User);
  const userId = auth0User.sub as string;
  await createOrUpdateDbUser(userId, userData);

  return auth0HandleProfile(req, res);
};
export { handleProfile };
export default withSentry(handleProfile);
