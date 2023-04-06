import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from 'util/\bcommon';

interface UserAuthContextProps {
  isAdmin: boolean;
}

export const UserAuthContext = createContext<UserAuthContextProps>({ isAdmin: false });

interface UserAuthProps {
  children: JSX.Element;
}

export function UserAuthProvider({ children }: UserAuthProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => getUserInfo());

  useEffect(() => {
    setIsAdmin(() => getUserInfo());
  }, []);

  return <UserAuthContext.Provider value={{ isAdmin }}>{children}</UserAuthContext.Provider>;
}

export const useUserAuth = () => useContext(UserAuthContext);
