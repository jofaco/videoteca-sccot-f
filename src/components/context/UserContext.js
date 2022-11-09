import React, { useState,useEffect  } from "react";

const Context = React.createContext({});

export function UserContextProvider({ children }) {
  const [jwt, setJWT] = useState(
    () => window.localStorage.getItem("access_token")
  )
  const [user, setUSER] = useState(
    () => JSON.parse(window.localStorage.getItem("user"))
  )
  useEffect(() => {
    if (!user) return setUSER([])
  }, [user])

  return <Context.Provider value={{
        jwt,
        user,
        setJWT,
        setUSER,
      }}>
      {children}
    </Context.Provider>
}

export default Context
