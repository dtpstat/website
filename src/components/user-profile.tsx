import { useUser } from "@auth0/nextjs-auth0";
import * as React from "react";

import { IframeAwareLoginLink } from "../shared/django-helpers";
import { User } from "../types";
import { AvatarImage } from "./avatar-image";
import { Link } from "./link";

export const UserProfile: React.VoidFunctionComponent = () => {
  const { user: auth0UserProfile, error, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (auth0UserProfile) {
    const user = auth0UserProfile.user as User;

    return (
      <div>
        <AvatarImage src={user.avatarUrl} alt={user.name} size={150} />
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <Link href="/api/auth/logout">Logout</Link>
      </div>
    );
  } else {
    return (
      <div>
        <IframeAwareLoginLink>login</IframeAwareLoginLink>
      </div>
    );
  }
};
