import { useUser as useAuth0User } from "@auth0/nextjs-auth0";
import * as React from "react";

import { fetchUser, patchUser, postUser } from "../requests/users";
import { userProfileToUser } from "../shared/user-helpers";
import { User } from "../types";

interface UserProfileContextValue {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isLoading: boolean;
  error: Error | undefined;
}

const UserProfileContext = React.createContext<
  UserProfileContextValue | undefined
>(undefined);

export const UserProfileProvider: React.VoidFunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const {
    user: auth0User,
    isLoading: auth0UserIsLoading,
    error: auth0Error,
  } = useAuth0User();
  const [dbUserIsLoading, setDbUserIsLoading] = React.useState<boolean>(true);
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    if (auth0UserIsLoading) {
      return;
    }
    const syncAuth0UserProfileWithDbUser = async () => {
      const createOrUpdateDbUser = async (
        userData: User,
      ): Promise<User | undefined> => {
        if (!auth0User) {
          return;
        }

        const userId = auth0User.sub as string;

        // Check if the user exists in the DB

        const dbUser = await fetchUser(window.location.origin, userId);

        return await (dbUser
          ? patchUser(window.location.origin, userId, {
              ...userData,
            })
          : postUser(window.location.origin, {
              ...userData,
              createDate: userData.updateDate,
            }));
      };

      if (auth0User) {
        const userData = userProfileToUser(auth0User);
        const updatedUser = await createOrUpdateDbUser(userData);
        setUser(updatedUser);
      }
      setDbUserIsLoading(false);
    };
    void syncAuth0UserProfileWithDbUser();
  }, [auth0User, auth0UserIsLoading]);

  const providerValue = React.useMemo<UserProfileContextValue>(
    () => ({
      user,
      setUser,
      isLoading: auth0UserIsLoading || dbUserIsLoading,
      error: auth0Error,
    }),
    [user, auth0UserIsLoading, dbUserIsLoading, auth0Error],
  );

  return (
    <UserProfileContext.Provider value={providerValue}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUser = (): UserProfileContextValue => {
  const result = React.useContext(UserProfileContext);
  if (result === undefined) {
    throw new Error("No UserProfileContext value available");
  }

  return result;
};
