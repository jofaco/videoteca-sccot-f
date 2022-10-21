import React, { useState } from "react";
import { useEffect } from "react";

const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const [jwt, setJWT] = useState(() =>
    window.localStorage.getItem("refresh_token")
  );
  const [user, setUSER] = useState(() => window.localStorage.getItem("user"));

  useEffect(() => {
    if (!jwt) return setJWT([]);
  }, [jwt]);

  useEffect(() => {
    if (!user) return setUSER([]);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        jwt,
        setJWT,
        user,
        setUSER,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
